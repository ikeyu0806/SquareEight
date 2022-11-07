# デプロイ対象アプリケーションの登録
resource "aws_codedeploy_app" "square_eight" {
  compute_platform = "ECS"
  name             = "square_eight-${terraform.workspace}"
}

resource "aws_codedeploy_deployment_group" "square_eight" {
  deployment_group_name = "square_eight-${terraform.workspace}"
  # 全てのトラフィックを更新されたECSコンテナに一度に移行する。
  # 時間差で更新していくよう設定も可能 https://docs.aws.amazon.com/ja_jp/codedeploy/latest/userguide/deployment-configurations.html
  deployment_config_name = "CodeDeployDefault.ECSAllAtOnce"
  app_name               = aws_codedeploy_app.square_eight.name
  service_role_arn       = aws_iam_role.codedeploy.arn
  # terraform実行時に依存関係を指定しないと失敗する
  depends_on = [aws_ecs_service.square_eight]

  # デプロイ失敗時にロールバックさせる
  auto_rollback_configuration {
    enabled = true
    events = [
      "DEPLOYMENT_FAILURE"
    ]
  }

  blue_green_deployment_config {
    deployment_ready_option {
      # タイムアウト時も続行
      action_on_timeout = "CONTINUE_DEPLOYMENT"
    }

    # デプロイ成功時に古いインスタンスを停止
    terminate_blue_instances_on_deployment_success {
      action                           = "TERMINATE"
      termination_wait_time_in_minutes = 2880
    }
  }

  deployment_style {
    # ロードバランサでトラフィックをコントロールしてBLUE/GREENデプロイする
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }

  # ECSサービスの指定
  ecs_service {
    cluster_name = aws_ecs_cluster.square_eight.name
    service_name = "square_eight-${terraform.workspace}"
  }

  # ロードバランサの指定。BLUE/GREENデプロイのためにターゲットグループを2つ用意する必要あり
  load_balancer_info {
    target_group_pair_info {
      prod_traffic_route {
        listener_arns = [
          aws_lb_listener.square_eight.arn
        ]
      }
      test_traffic_route {
        listener_arns = [
          aws_alb_listener.square_eight-alb-8443.arn
        ]
      }
      target_group {
        name = aws_lb_target_group.blue.name
      }
      target_group {
        name = aws_lb_target_group.green.name
      }
    }
  }
}
