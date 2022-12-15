terraform {
  backend "s3" {
    bucket = "square-eight-ecs-tfstate"
    key    = "terraform.tfstate"
    region = "ap-northeast-1"
  }
}
