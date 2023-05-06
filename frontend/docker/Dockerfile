FROM node:20

RUN apt-get update
RUN apt-get -y install vim

RUN mkdir -p /app/frontend
ENV APP_ROOT /app/frontend

WORKDIR $APP_ROOT

COPY package*.json $APP_ROOT
RUN yarn install

CMD ["yarn", "dev"]
