# Elastic IP（固定IPアドレス）の作成。ここで作成されたIPがECSのアウトバウンドIPになる
resource "aws_eip" "square_eight-nat-1a" {
  vpc = true

  depends_on = [aws_internet_gateway.square_eight]

  tags = {
    Name = "square_eight-${terraform.workspace}-natgw-1a"
  }
}

resource "aws_eip" "square_eight-nat-1c" {
  vpc = true

  depends_on = [aws_internet_gateway.square_eight]

  tags = {
    Name = "square_eight-${terraform.workspace}-natgw-1c"
  }
}
