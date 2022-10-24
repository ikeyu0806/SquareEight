FactoryBot.define do
  factory :message_template, class: MessageTemplate do
    name { 'demo_name' }
    title { 'demo_title' }
    content { 'demo_content' }
  end
end
