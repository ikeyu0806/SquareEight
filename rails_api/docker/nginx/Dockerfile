FROM nginx:1.19-alpine

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

ENV RAILS_ENV production

RUN mkdir -p /etc/nginx/conf.d/
COPY ./docker/containers/nginx/webapp.conf /etc/nginx/conf.d/webapp.conf

RUN mkdir -p /workdir
ENV APP_ROOT /workdir

WORKDIR $APP_ROOT

VOLUME /workdir/tmp

CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
