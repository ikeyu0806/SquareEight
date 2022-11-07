variable "vpc_cidr_block" {}

resource "aws_vpc" "square-eight" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "square-eight-ecs-${terraform.workspace}"
  }
}
