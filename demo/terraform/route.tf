# VPCのルートテーブル
resource "aws_route_table" "square-eight-api-demo-public" {
  vpc_id = var.vpc_id

  tags = {
    Name = "square-eight-api-demo-public"
  }
}

# VPCのインターネットへの接続設定
resource "aws_route" "square-eight-api-demo-public" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_route_table.square-eight-api-demo-public.id
  gateway_id             = "igw-ca1645ae"
}

# サブネットとルートテーブルの紐付け
resource "aws_route_table_association" "square-eight-api-demo-public-1a" {
  subnet_id      = aws_subnet.square-eight-api-demo-public-1a.id
  route_table_id = aws_route_table.square-eight-api-demo-public.id
}
