# VPCをインターネットに接続させるために必要
resource "aws_internet_gateway" "square_eight" {
  vpc_id = aws_vpc.square_eight.id

  tags = {
    Name = "square_eight-ecs-${terraform.workspace}"
  }
}
