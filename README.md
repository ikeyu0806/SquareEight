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
