# サブネットにElastic IPを紐づける。ここで指定されたIPがECSのアウトバウンドIPアドレスとして扱われる
resource "aws_nat_gateway" "square_eight-nat-1a" {
  subnet_id     = aws_subnet.square_eight-public-1a.id
  allocation_id = aws_eip.square_eight-nat-1a.id

  depends_on = [aws_internet_gateway.square_eight]

  tags = {
    Name = "square_eight-ecs-${terraform.workspace}-1a"
  }
}

resource "aws_nat_gateway" "square_eight-nat-1c" {
  subnet_id     = aws_subnet.square_eight-public-1c.id
  allocation_id = aws_eip.square_eight-nat-1c.id

  depends_on = [aws_internet_gateway.square_eight]

  tags = {
    Name = "square_eight-ecs-${terraform.workspace}-1c"
  }
}
