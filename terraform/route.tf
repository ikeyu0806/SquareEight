# VPCのルートテーブル
resource "aws_route_table" "square_eight-public" {
  vpc_id = aws_vpc.square_eight.id

  tags = {
    Name = "square_eight-ecs-${terraform.workspace}-public"
  }
}

# VPCのインターネットへの接続設定
resource "aws_route" "square_eight-public" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_route_table.square_eight-public.id
  gateway_id             = aws_internet_gateway.square_eight.id
}

# サブネットとルートテーブルの紐付け
resource "aws_route_table_association" "square_eight-public-1a" {
  subnet_id      = aws_subnet.square_eight-public-1a.id
  route_table_id = aws_route_table.square_eight-public.id
}

resource "aws_route_table_association" "square_eight-public-1c" {
  subnet_id      = aws_subnet.square_eight-public-1c.id
  route_table_id = aws_route_table.square_eight-public.id
}

# プライベートサブネットとVPCの紐付け
resource "aws_route_table" "square_eight-private-1a" {
  vpc_id = aws_vpc.square_eight.id

  tags = {
    Name = "square_eight-ecs-${terraform.workspace}-private-1a"
  }
}

resource "aws_route_table" "square_eight-private-1c" {
  vpc_id = aws_vpc.square_eight.id

  tags = {
    Name = "square_eight-ecs-${terraform.workspace}-private-1c"
  }
}

resource "aws_route_table_association" "square_eight-private-1a" {
  subnet_id      = aws_subnet.square_eight-private-1a.id
  route_table_id = aws_route_table.square_eight-private-1a.id
}

resource "aws_route_table_association" "square_eight-private-1c" {
  subnet_id      = aws_subnet.square_eight-private-1c.id
  route_table_id = aws_route_table.square_eight-private-1c.id
}

# ECSのタスクを起動させているプライベートサブネットのインターネット接続設定
resource "aws_route" "square_eight-private-1a" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_route_table.square_eight-private-1a.id
  nat_gateway_id         = aws_nat_gateway.square_eight-nat-1a.id
}

resource "aws_route" "square_eight-private-1c" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_route_table.square_eight-private-1c.id
  nat_gateway_id         = aws_nat_gateway.square_eight-nat-1c.id
}
