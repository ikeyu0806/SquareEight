FactoryBot.define do
  factory :purchased_ticket, class: PurchasedTicket do
    remain_number { 100 }
    expired_at { Time.zone.now + 1.year }
  end
end
