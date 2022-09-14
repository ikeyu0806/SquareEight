## サービス起動

```
docker-compose up
```

## ローカルでstripeのWebhookテスト
```
brew install stripe/stripe-cli/stripe

stripe login

stripe listen --forward-to localhost:3222/stripe_webhooks
```
