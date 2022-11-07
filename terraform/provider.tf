# terraform.tfvarsに指定された変数を読み込む
# terraform.tfvarsには機密情報が含まれているためgitの管理からは除外
variable "access_key" {}
variable "secret_key" {}

provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = "ap-northeast-1"
}
