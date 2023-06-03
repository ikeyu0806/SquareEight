![SquareEight-logo-horizontal](https://github.com/ikeyu0806/SquareEight/assets/30525452/62461f86-b9bc-4ae8-b6c2-8be76035becc)

# About SquareEight
SquareEight is an open-source online business management web service.

Originally, it was operated as a paid service by the author as an individual, but it has been switched to an OSS project. You can fork it and use it for commercial purposes.

If you have experience with Rails, React, or Terraform, feel free to contribute even if you are a beginner programmer.

Contributions related to documentation are also welcome.

# Features
- Reservation page creation feature
- Multiple ticket creation feature
- Monthly subscription creation feature
- EC page creation feature
- Online questionnaire
- Mini web page creation feature
- Customer management feature
- Email sending feature
- Integration with LINE Official Account
- Scheduled LINE message sending feature

# Technical Stack
## Backend
- Ruby on Rails

## Frontend
- React.js
- Next.js
- Typescript

## Database
- Redis
- Postgresql

## Infrastructure
- Terraform
- AWS ECS

# Local Development

## Setting up env file
For local development, first create `docker_local.env` based on the template file `template.env` in the `docker` directory.

```shell
cp docker/template.env docker/docker_local.env
```

Then, set the keys for AWS, Stripe, and LINE as needed.

## Starting the service

```shell
docker-compose up
```

## Working with Docker shell

```
docker exec -it square_eight_rails_api bash
```

## Testing Stripe webhook locally
```
brew install stripe/stripe-cli/stripe

stripe login

stripe listen --forward-to localhost:3222/stripe_webhooks
```

## Utilizing LINE integration feature
The features that use the LINE API can be developed by exposing the local environment to the internet.

ngrok

```
ngrok config add-authtoken xxxxxxxxxxxxxx
ngrok http 3222
```

# Deployment

## serverless-component
The frontend infrastructure can be deployed using sls-next/serverless-component.

Frontend deployment
```
APP_ENV=main serverless
```

## terraform
The backend infrastructure is managed using Terraform.

```
# Initialization
terraform init
# Create workspace
terraform workspace new main
# Create resources
terraform apply --var-file=main.tfvars
# Destroy resources
terraform destroy --var-file=main.tfvars
```

The following resources are not managed by Terraform.

The storage-related resources are excluded from the terraform destroy command to keep them intact. VPC is excluded because it should be created before RDS and Redis.

- VPC
- Internet Gateway
- RDS
- Redis
- CloudWatch
- S3
- ECR

## Pushing images to ECR

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
Create an env file named docker_ecs_{branch_name}.env.

```
cp docker/template.env docker/docker_ecs_main.env
```

## Author
Yuki Ikegaya

For inquiries, please contact[here](https://yuki-ikegaya.net/%e3%81%8a%e5%95%8f%e3%81%84%e5%90%88%e3%82%8f%e3%81%9b/)

If you have any questions, please either post through the contact form or create an issue.

## License
[MIT License](https://opensource.org/licenses/MIT).
