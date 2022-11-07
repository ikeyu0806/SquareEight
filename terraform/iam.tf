# タスクのIAMロール
# AssumeRoleを使ってIAMの権限をECSタスクに付与
# 環境変数を取り出すためS3への接続権限付与
resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "ECSsquare_eight${terraform.workspace}EcsTaskRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
  managed_policy_arns = [aws_iam_policy.square_eight_s3_policy.arn,
  aws_iam_policy.square_eight_ecs_exec_policy.arn]
}

# AssumeRoleを定義
data "aws_iam_policy_document" "assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# 環境変数の参照。GetとListの権限が必要
resource "aws_iam_policy" "square_eight_s3_policy" {
  name = "square_eight-ecs-${terraform.workspace}-s3-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:Get*",
          "s3:List*",
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

# セッションマネージャの権限付与。ecs execute-commandコマンドでECSのコンテナのシェルを実行するのに必要
resource "aws_iam_policy" "square_eight_ecs_exec_policy" {
  name = "square_eight-${terraform.workspace}-ecs-exec-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "ssmmessages:CreateControlChannel",
          "ssmmessages:CreateDataChannel",
          "ssmmessages:OpenControlChannel",
          "ssmmessages:OpenDataChannel"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

# CodeDeployにもAssumeRoleを付与
resource "aws_iam_role_policy_attachment" "amazon_ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "codedeploy_assumerole" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["codedeploy.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "codedeploy" {
  name               = "square_eight-ecs-pipeline-${terraform.workspace}"
  assume_role_policy = data.aws_iam_policy_document.codedeploy_assumerole.json
}

resource "aws_iam_role_policy_attachment" "codedeploy" {
  role       = aws_iam_role.codedeploy.id
  policy_arn = "arn:aws:iam::aws:policy/AWSCodeDeployRoleForECS"
}
