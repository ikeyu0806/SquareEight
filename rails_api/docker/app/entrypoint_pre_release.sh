#!/bin/sh
echo "start rails initial script..."

cd /workdir

bundle exec rails tmp:clear
bundle exec rails db:migrate RAILS_ENV=production
# rails tmp:clearじゃ削除されない
rm /workdir/tmp/pids/server.pid

bundle exec puma -C config/puma.rb

echo "finish rails initial script..."

while :; do sleep 10; done
