FactoryBot.define do
  factory :line_users, class: LineUser do
    line_user_id { 'demo' }
    line_display_name { 'demo' }
    line_picture_url { 'demo' }
  end
end
