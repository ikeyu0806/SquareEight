FactoryBot.define do
  factory :ticket_master, class: TicketMaster do
    name { '100枚発行' }
    issue_number { 100 }
    price { 1000 }
    is_expired { true }
    effective_month { 12 }
    publish_status { 'Publish' }
  end
end
