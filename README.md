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

## デプロイ
フロントエンドデプロイ
```
APP_ENV=main serverless
```

## terraform
```
# 初期化
terraform init
# workspace作成
terraform workspace new main
# 作成
terraform apply --var-file=main.tfvars
# 削除
terraform destory
```


以下のリソースはterraformの管理対象外です。

ストレージ関連はterraform destoryの対象から外すため、VPCはRDS、Redis作成前に作成したいので除外しています。

- VPC
- Internet Gateway
- RDS
- Redis
- CloudWatch
- S3
