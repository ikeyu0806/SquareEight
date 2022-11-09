# ECSのセキュリティグループ
resource "aws_security_group" "square-eight-ecs" {
  name        = "square-eight-ecs-${terraform.workspace}"
  description = "square-eight-ecs-${terraform.workspace}"
  vpc_id      = var.vpc_id

  egress {
    from_port = 0
    to_port   = 0
    # -1で全てのプロトコルを許可
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-ecs"
  }
}

# ロードバランサのセキュリティグループ
resource "aws_security_group" "square-eight-alb" {
  name        = "square-eight-ecs-${terraform.workspace}-alb"
  description = "square-eight-ecs-${terraform.workspace} alb"
  vpc_id      = var.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-alb"
  }
}
