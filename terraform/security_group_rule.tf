# ロードバランサのセキュリティグループ設定。HTTPとHTTPSのインバウンドを許可
resource "aws_security_group_rule" "square_eight-alb-http" {
  security_group_id = aws_security_group.square_eight-alb.id

  type = "ingress"

  from_port = 80
  to_port   = 80
  protocol  = "tcp"

  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "square_eight-alb-https" {
  security_group_id = aws_security_group.square_eight-alb.id

  type = "ingress"

  from_port = 443
  to_port   = 443
  protocol  = "tcp"

  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "square_eight-alb-https-deploy-test" {
  security_group_id = aws_security_group.square_eight-alb.id

  type = "ingress"

  from_port = 8443
  to_port   = 8443
  protocol  = "tcp"

  cidr_blocks = ["0.0.0.0/0"]
}

# この設定に誤りがあると504エラーが起こる
resource "aws_security_group_rule" "square_eight-ecs" {
  security_group_id = aws_security_group.square_eight-ecs.id

  type      = "ingress"
  from_port = 80
  to_port   = 80
  protocol  = "tcp"

  # VPCを指定
  cidr_blocks = [var.vpc_cidr_block]
}

resource "aws_security_group_rule" "square_eight-ecs-test" {
  security_group_id = aws_security_group.square_eight-ecs.id

  type      = "ingress"
  from_port = 8080
  to_port   = 8080
  protocol  = "tcp"

  # VPCを指定
  cidr_blocks = [var.vpc_cidr_block]
}
