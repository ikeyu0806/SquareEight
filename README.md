# ローカル開発

## サービス起動

```
docker-compose up
```

## dockerのシェル操作

```
docker exec -it square_eight_rails_api bash
```

## ローカルでstripeのWebhookテスト
```
brew install stripe/stripe-cli/stripe

stripe login

stripe listen --forward-to localhost:3222/stripe_webhooks
```

# デプロイ

## serverless-component
フロントエンドのインフラは`sls-next/serverless-component`で管理しています。

フロントエンドデプロイ
```
APP_ENV=main serverless
```

## terraform
バックエンドのインフラはterraformで管理しています。

```
# 初期化
terraform init
# workspace作成
terraform workspace new main
# 作成
terraform apply --var-file=main.tfvars
# 削除
terraform destory --var-file=main.tfvars
```

以下のリソースはterraformの管理対象外です。

ストレージ関連はterraform destoryの対象から外すため、VPCはRDS、Redis作成前に作成したいので除外しています。

- VPC
- Internet Gateway
- RDS
- Redis
- CloudWatch
- S3
- ECR

## ECRへのイメージpush

```
# rails
cd rails_api
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 606213504831.dkr.ecr.ap-northeast-1.amazonaws.com
docker build -f docker/app/Dockerfile -t square-eight-main/rails-api .
docker tag square-eight-main/rails-api:latest 606213504831.dkr.ecr.ap-northeast-1.amazonaws.com/square-eight-main/rails-api:latest
docker push 606213504831.dkr.ecr.ap-northeast-1.amazonaws.com/square-eight-main/rails-api:latest

# nginx
docker build -f docker/nginx/Dockerfile  -t square-eight-main/nginx .
docker tag square-eight-main/nginx:latest 606213504831.dkr.ecr.ap-northeast-1.amazonaws.com/square-eight-main/nginx:latest
docker push 606213504831.dkr.ecr.ap-northeast-1.amazonaws.com/square-eight-main/nginx:latest
```
