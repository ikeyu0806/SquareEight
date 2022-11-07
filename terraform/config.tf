terraform {
  backend "s3" {
    bucket = "square_eight-dev-ecs-tfstate"
    key    = "terraform.tfstate"
    region = "ap-northeast-1"
  }
}
