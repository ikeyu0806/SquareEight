# VPCのルートテーブル
resource "aws_route_table" "square-eight-public" {
  vpc_id = var.vpc_id

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-public"
  }
}

# VPCのインターネットへの接続設定
resource "aws_route" "square-eight-public" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_route_table.square-eight-public.id
  gateway_id             = "igw-ca1645ae"
}

# サブネットとルートテーブルの紐付け
resource "aws_route_table_association" "square-eight-public-1a" {
  subnet_id      = aws_subnet.square-eight-public-1a.id
  route_table_id = aws_route_table.square-eight-public.id
}

resource "aws_route_table_association" "square-eight-public-1c" {
  subnet_id      = aws_subnet.square-eight-public-1c.id
  route_table_id = aws_route_table.square-eight-public.id
}

resource "aws_route_table_association" "square-eight-public-1d" {
  subnet_id      = aws_subnet.square-eight-public-1d.id
  route_table_id = aws_route_table.square-eight-public.id
}

# プライベートサブネットとVPCの紐付け
resource "aws_route_table" "square-eight-private-1a" {
  vpc_id = var.vpc_id

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-private-1a"
  }
}

resource "aws_route_table" "square-eight-private-1c" {
  vpc_id = var.vpc_id

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-private-1c"
  }
}

resource "aws_route_table" "square-eight-private-1d" {
  vpc_id = var.vpc_id

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-private-1d"
  }
}

resource "aws_route_table_association" "square-eight-private-1a" {
  subnet_id      = aws_subnet.square-eight-private-1a.id
  route_table_id = aws_route_table.square-eight-private-1a.id
}

resource "aws_route_table_association" "square-eight-private-1c" {
  subnet_id      = aws_subnet.square-eight-private-1c.id
  route_table_id = aws_route_table.square-eight-private-1c.id
}

resource "aws_route_table_association" "square-eight-private-1d" {
  subnet_id      = aws_subnet.square-eight-private-1d.id
  route_table_id = aws_route_table.square-eight-private-1d.id
}

# ECSのタスクを起動させているプライベートサブネットのインターネット接続設定
resource "aws_route" "square-eight-private-1a" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_route_table.square-eight-private-1a.id
  nat_gateway_id         = aws_nat_gateway.square-eight-nat-1a.id
}

resource "aws_route" "square-eight-private-1c" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_route_table.square-eight-private-1c.id
  nat_gateway_id         = aws_nat_gateway.square-eight-nat-1c.id
}

resource "aws_route" "square-eight-private-1d" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_route_table.square-eight-private-1d.id
  nat_gateway_id         = aws_nat_gateway.square-eight-nat-1d.id
}
