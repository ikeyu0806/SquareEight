# VPCをインターネットに接続させるために必要
resource "aws_internet_gateway" "square-eight" {
  vpc_id = "vpc-08f614a0e33beb9fa!"

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}"
  }
}
