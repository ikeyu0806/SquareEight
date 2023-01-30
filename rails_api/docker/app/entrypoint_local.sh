#!/bin/sh
echo "start rails initial script..."

cd /workdir

bundle exec rails db:create RAILS_ENV=development
bundle exec rails db:migrate RAILS_ENV=development

bundle exec rails db:create RAILS_ENV=test
bundle exec rails db:migrate RAILS_ENV=test

bundle exec rails tmp:clear
# rails tmp:clearじゃ削除されない
rm /workdir/tmp/pids/server.pid

bundle exec rails s -p 3000 -b '0.0.0.0'

echo "finish rails initial script..."

while :; do sleep 10; done
