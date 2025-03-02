![margin square eight with_text2](https://github.com/ikeyu0806/SquareEight/assets/30525452/2dae5d06-216e-4977-971d-628443895bfa)

[英語はこちら](README-en.md)

# SquareEightについて
SquareEightはオープンソースのオンラインビジネス運営Webサービスです。

元々作者が個人運営の有償サービスとして運営していましたがOSSプロジェクトに切り替えました。
フォークして商用利用可能です。

Rails、React、Terraformの知見がある方はプログラミング初心者の方でも気軽にPR送ってください。

まずはドキュメント関連のコントリビュートも歓迎します。

# 機能
- 予約ページ作成機能
- 回数券作成機能
- 月額サブスクリプション作成機能
- ECページ作成機能
- オンラインアンケート
- ミニWebページ作成機能
- 顧客管理機能
- メール送信機能
- LINE公式アカウントとの連携機能
- LINEメッセージ送信予約機能

# 構成技術
## バックエンド
- Ruby on Rails

## フロントエンド
- React.js
- Next.js
- Typescript

## データベース
- Redis
- Postgresql

## インフラ
- Terraform
- AWS ECS


# ローカル開発

## envファイル設定

ローカル開発ではまずtemplateを元に環境変数を設定するenvとconfigを作成して下さい。

rails_apiのローカルenv作成
```
cp rails_api/docker/template.env rails_api/docker/docker_local.env
```

frontendのローカルdconfig作成
```
cp frontend/config/config_template.json frontend/config/local.json
```

その後必要に応じてAWS、Stripe、LINE、Googleのキーを設定して下さい

## サービス起動
```
docker compose build
docker compose run square_eight_frontend yarn install
```

```
docker compose up
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

## LINE連携機能の活用
LINE APIを使った機能はローカルをインターネット公開して開発可能です。

ngrok

```
ngrok config add-authtoken xxxxxxxxxxxxxx
ngrok http 3222
```

# デプロイ

## serverless-component
フロントエンドのインフラは`sls-next/serverless-component`でデプロイできるようにしています。

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
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin xxxxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com
docker build -f docker/app/Dockerfile -t square-eight-main/rails-api .
docker tag square-eight-main/rails-api:latest xxxxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com/square-eight-main/rails-api:latest
docker push xxxxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com/square-eight-main/rails-api:latest

# nginx
docker build -f docker/nginx/Dockerfile  -t square-eight-main/nginx .
docker tag square-eight-main/nginx:latest xxxxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com/square-eight-main/nginx:latest
docker push xxxxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com/square-eight-main/nginx:latest
```

## env
docker_ecs_{ブランチ名}.envという名前でenvを作成して下さい。

```
cp docker/template.env docker/docker_ecs_main.env
```

## 作者
Yuki Ikegaya

お問い合わせは[こちら](https://yuki-ikegaya.net/%e3%81%8a%e5%95%8f%e3%81%84%e5%90%88%e3%82%8f%e3%81%9b/)

ご質問ある方はお問い合わせからPOSTするかissue立ててください。

## ライセンス
[MIT License](https://opensource.org/licenses/MIT).
