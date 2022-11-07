# ECSのセキュリティグループ
resource "aws_security_group" "square_eight-ecs" {
  name        = "square_eight-ecs-${terraform.workspace}"
  description = "square_eight-ecs-${terraform.workspace}"
  vpc_id      = aws_vpc.square_eight.id

  egress {
    from_port = 0
    to_port   = 0
    # -1で全てのプロトコルを許可
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "square_eight-ecs-${terraform.workspace}-ecs"
  }
}

# ロードバランサのセキュリティグループ
resource "aws_security_group" "square_eight-alb" {
  name        = "square_eight-ecs-${terraform.workspace}-alb"
  description = "square_eight-ecs-${terraform.workspace} alb"
  vpc_id      = aws_vpc.square_eight.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "square_eight-ecs-${terraform.workspace}-alb"
  }
}
