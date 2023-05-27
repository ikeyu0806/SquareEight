# VPCのルートテーブル
resource "aws_route_table" "square-eight-public" {
  vpc_id = var.vpc_id

  tags = {
    Name = "square-eight-api-demo-public"
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
