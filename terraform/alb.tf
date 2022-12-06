# ECSのサービスに紐づくロードバランサ
resource "aws_lb" "square-eight-alb" {
  load_balancer_type = "application"
  name               = "square-eight-ecs-${terraform.workspace}"

  security_groups = [aws_security_group.square-eight-alb.id, aws_subnet.square-eight-public-1c.id]
  # subnets         = [aws_subnet.square-eight-public-1a.id, aws_subnet.square-eight-public-1c.id, aws_subnet.square-eight-public-1d.id]
  subnets         = [aws_subnet.square-eight-public-1a.id]
}

resource "aws_lb_listener_rule" "square-eight" {
  listener_arn = aws_lb_listener.square-eight.arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.blue.id
  }

  condition {
    path_pattern {
      values = ["*"]
    }
  }
}

# HTTPリクエストをHTTPSに転送する
resource "aws_lb_listener" "square-eight" {
  port     = "80"
  protocol = "HTTP"

  load_balancer_arn = aws_lb.square-eight-alb.arn

  # BLUE/GREENデプロイ時に入れ替えるため差分を無視する
  lifecycle {
    ignore_changes = [default_action]
  }

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_alb_listener" "square-eight-alb-443" {
  load_balancer_arn = aws_lb.square-eight-alb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "arn:aws:acm:ap-northeast-1:606213504831:certificate/59f7f964-5aa2-439a-af29-1475aecc9351"

  lifecycle {
    ignore_changes = [default_action]
  }

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.blue.arn
  }
}

resource "aws_alb_listener" "square-eight-alb-8443" {
  load_balancer_arn = aws_lb.square-eight-alb.arn
  port              = "8443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "arn:aws:acm:ap-northeast-1:606213504831:certificate/59f7f964-5aa2-439a-af29-1475aecc9351"

  lifecycle {
    ignore_changes = [default_action]
  }

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.green.arn
  }
}

# ECSのBLUE/GREENデプロイメントを実行するためにターゲットグループを２つ用意する
resource "aws_lb_target_group" "blue" {
  name        = "square-eight-${terraform.workspace}-blue"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  # assets:precompileに時間がかかり、途中ヘルスチェックでエラー判定されてしまうためintervalを長めに
  health_check {
    interval = 300
    timeout  = 120
    port     = 80
    path     = "/health"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lb_target_group" "green" {
  name        = "square-eight-${terraform.workspace}-green"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    interval = 300
    timeout  = 120
    port     = 80
    path     = "/health"
  }

  lifecycle {
    create_before_destroy = true
  }
}

