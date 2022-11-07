# サブネットにElastic IPを紐づける。ここで指定されたIPがECSのアウトバウンドIPアドレスとして扱われる
resource "aws_nat_gateway" "square-eight-nat-1a" {
  subnet_id     = aws_subnet.square-eight-public-1a.id
  allocation_id = aws_eip.square-eight-nat-1a.id

  depends_on = [aws_internet_gateway.square-eight]

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-1a"
  }
}

resource "aws_nat_gateway" "square-eight-nat-1c" {
  subnet_id     = aws_subnet.square-eight-public-1c.id
  allocation_id = aws_eip.square-eight-nat-1c.id

  depends_on = [aws_internet_gateway.square-eight]

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-1c"
  }
}

resource "aws_nat_gateway" "square-eight-nat-1d" {
  subnet_id     = aws_subnet.square-eight-public-1d.id
  allocation_id = aws_eip.square-eight-nat-1d.id

  depends_on = [aws_internet_gateway.square-eight]

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-1d"
  }
}
