FROM ruby:3.1.0

RUN apt-get update
RUN apt-get install -y vim libmagickwand-dev

RUN mkdir -p /workdir
ENV APP_ROOT /workdir

RUN mkdir -p /workdir/tmp/sockets
RUN mkdir -p /workdir/tmp/pids
RUN mkdir -p /workdir/log

WORKDIR $APP_ROOT

COPY ./ $APP_ROOT

RUN gem install bundler
RUN bundle install

# timezone
ENV TZ Asia/Tokyo

VOLUME /workdir/tmp
