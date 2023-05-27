variable "subnet_public_1a_cidr_block" {}
variable "vpc_id" {}

# インターネットに接続させるパブリックサブネット
resource "aws_subnet" "square-eight-api-demo-public-1a" {
  vpc_id = var.vpc_id

  availability_zone = "ap-northeast-1a"

  cidr_block = var.subnet_public_1a_cidr_block

  tags = {
    Name = "square-eight-api-demo-public-1a"
  }
}
