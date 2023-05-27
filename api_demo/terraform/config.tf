terraform {
  backend "s3" {
    bucket = "square-eight-api-demo-tfstate"
    key    = "terraform.tfstate"
    region = "ap-northeast-1"
  }
}
