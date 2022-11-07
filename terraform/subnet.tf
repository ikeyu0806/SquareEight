variable "subnet_public_1a_cidr_block" {}
variable "subnet_public_1c_cidr_block" {}
variable "subnet_public_1d_cidr_block" {}
variable "subnet_private_1a_cidr_block" {}
variable "subnet_private_1c_cidr_block" {}
variable "subnet_private_1d_cidr_block" {}

# インターネットに接続させるパブリックサブネット
resource "aws_subnet" "square-eight-public-1a" {
  vpc_id = aws_vpc.square-eight.id

  availability_zone = "ap-northeast-1a"

  cidr_block = var.subnet_public_1a_cidr_block

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-public-1a"
  }
}

resource "aws_subnet" "square-eight-public-1c" {
  vpc_id = aws_vpc.square-eight.id

  availability_zone = "ap-northeast-1c"

  cidr_block = var.subnet_public_1c_cidr_block

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-public-1c"
  }
}

resource "aws_subnet" "square-eight-public-1d" {
  vpc_id = aws_vpc.square-eight.id

  availability_zone = "ap-northeast-1d"

  cidr_block = var.subnet_public_1c_cidr_block

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-public-1d"
  }
}

# 以下ECSのFagateを起動させるプライベートサブネット
resource "aws_subnet" "square-eight-private-1a" {
  vpc_id = aws_vpc.square-eight.id

  availability_zone = "ap-northeast-1a"
  cidr_block        = var.subnet_private_1a_cidr_block

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-private-1a"
  }
}

resource "aws_subnet" "square-eight-private-1c" {
  vpc_id = aws_vpc.square-eight.id

  availability_zone = "ap-northeast-1c"
  cidr_block        = var.subnet_private_1c_cidr_block

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-private-1c"
  }
}

resource "aws_subnet" "square-eight-private-1d" {
  vpc_id = aws_vpc.square-eight.id

  availability_zone = "ap-northeast-1d"
  cidr_block        = var.subnet_private_1c_cidr_block

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}-private-1d"
  }
}
