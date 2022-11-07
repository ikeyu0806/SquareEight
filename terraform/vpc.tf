variable "vpc_cidr_block" {}

resource "aws_vpc" "square_eight" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "square_eight-ecs-${terraform.workspace}"
  }
}
