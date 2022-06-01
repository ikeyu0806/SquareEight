FROM ruby:3.1.0

RUN apt-get update
RUN apt-get install -y vim

RUN mkdir -p /app/rails
ENV APP_ROOT /app/rails

RUN mkdir -p /app/rails/tmp/sockets
RUN mkdir -p /app/rails/tmp/pids
RUN mkdir -p /app/rails/log

WORKDIR $APP_ROOT

COPY ./ $APP_ROOT

RUN gem install bundler
RUN bundle install

# timezone
ENV TZ Asia/Tokyo

VOLUME /app/rails/tmp
