# VPCをインターネットに接続させるために必要
resource "aws_internet_gateway" "square-eight" {
  vpc_id = aws_vpc.square-eight.id

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}"
  }
}
