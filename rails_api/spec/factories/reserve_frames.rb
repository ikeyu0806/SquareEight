FactoryBot.define do
  factory :reserve_frame, class: ReserveFrame do
    title { 'reserve_frame_demo' }
    publish_status { 'Publish' }
    capacity { 10 }
    local_payment_price { 1000 }
    credit_card_payment_price { 1000 }
    is_local_payment_enable { true }
    is_credit_card_payment_enable { true }
    is_ticket_payment_enable { true }
    is_monthly_plan_payment_enable { true }
    start_at { Time.zone.now }
    repeat_end_date { Time.zone.now + 1.month }
    is_every_day_repeat { true }
    is_every_week_repeat { true }
    is_every_month_repeat { true }
    is_repeat_sun { false }
    is_repeat_mon { true }
    is_repeat_tue { true }
    is_repeat_wed { true }
    is_repeat_thu { true }
    is_repeat_fri { true }
    is_repeat_sat { false }
    reception_type { 'Immediate' }
    reception_start_day_before { 1 }
  end
end