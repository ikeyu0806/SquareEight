FactoryBot.define do
  factory :reserve_frame, class: ReserveFrame do
    title { 'reserve_frame_demo' }
    publish_status { 'Publish' }
    capacity { 5 }
    local_payment_price { 1000 }
    credit_card_payment_price { 1000 }
    is_local_payment_enable { true }
    is_credit_card_payment_enable { true }
    is_ticket_payment_enable { true }
    is_monthly_plan_payment_enable { true }
    start_at { Time.zone.now }
    repeat_end_date { Time.zone.now + 3.month }
    repeat_interval_type { 'Day' }
    is_repeat { true }
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
    repeat_interval_number_day { 1 }
    repeat_interval_number_week { 1 }
    repeat_interval_number_month { 1 }
    reception_type { 'Immediate' }
    reception_start_day_before { 30 }
    reception_deadline_hour_before { 1 }
    reception_deadline_day_before { 1 }

    trait :cancel_possible_before_the_day do
      reception_deadline { 'PossibleBeforeTheDay' }
    end
  end
end
