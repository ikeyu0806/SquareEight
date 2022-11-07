variable "app_task_cpu" {}
variable "app_task_memory" {}

resource "aws_ecs_cluster" "square_eight" {
  name = "square_eight-${terraform.workspace}"
}

# Railsとnginxのサービス、タスク
resource "aws_ecs_service" "square_eight" {
  name = "square_eight-${terraform.workspace}"

  # terraform実行時にALBが作成されていないと失敗する時があるので依存関係指定
  depends_on = [aws_lb.square_eight-alb,
    aws_lb_listener_rule.square_eight,
  aws_lb_target_group.blue]

  cluster = aws_ecs_cluster.square_eight.name

  launch_type = "FARGATE"

  # サービスの中で起動するタスクの数を指定
  desired_count = "1"

  # コンテナでシェルを実行するために必要
  enable_execute_command = true

  # このタスク定義を元にタスクが起動
  task_definition = aws_ecs_task_definition.square_eight.arn

  # サブネットの指定
  network_configuration {
    subnets         = [aws_subnet.square_eight-private-1a.id, aws_subnet.square_eight-private-1c.id]
    security_groups = [aws_security_group.square_eight-ecs.id]
  }

  # ロードバランサにはnginxを接続
  load_balancer {
    target_group_arn = aws_lb_target_group.blue.arn
    container_name   = "nginx"
    container_port   = "80"
  }

  # CodeDeployを使ってデプロイするために必要な設定
  deployment_controller {
    type = "CODE_DEPLOY"
  }

  lifecycle {
    ignore_changes = [desired_count]
  }
}


resource "aws_ecs_task_definition" "square_eight" {
  # ここで登録したファミリーの中でバージョンが管理される
  family = "square_eight_${terraform.workspace}"

  # EC2 or Fagateを指定
  requires_compatibilities = ["FARGATE"]

  # タスクに割り当てるリソース定義
  cpu    = var.app_task_cpu
  memory = var.app_task_memory

  # VPCのIPアドレスでアクセスさせる
  network_mode = "awsvpc"

  # アプリケーションが使用する権限
  task_role_arn      = aws_iam_role.ecs_task_execution_role.arn
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn

  # nginxとrailsのpumaをsocketファイルで接続させるため、同じタスク内で両コンテナを起動しvolumeをマウントさせる
  # 環境変数はS3から取得する
  # rails起動時はmigration、assets:precompile、pumaの起動を実行
  container_definitions = <<EOL
[
  {
    "name": "nginx",
    "image": "314488254505.dkr.ecr.ap-northeast-1.amazonaws.com/square_eight-${terraform.workspace}/nginx:latest",
    "essential": true,
    "workingDirectory": "/",
    "memory": 512,
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-region": "ap-northeast-1",
        "awslogs-stream-prefix": "nginx",
        "awslogs-group": "/ecs/square_eight-${terraform.workspace}-nginx"
      }
    },
    "portMappings": [
      {
        "containerPort": 80,
        "hostPort": 80
      }
    ]
  }
]
EOL
}
