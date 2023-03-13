FactoryBot.define do
  factory :monthly_payment_plan, class: MonthlyPaymentPlan do
    name { '月額サブスクリプション' }
    price { 1000 }
    publish_status { 'Publish' }
    reserve_is_unlimited { false }
    enable_reserve_count { 1 }
    reserve_interval_number { 1 }
    reserve_interval_unit { 'Week' }
  end

  factory :one_times_every_three_days_reservable_plan, class: MonthlyPaymentPlan do
    name { '3日に1回予約可能' }
    price { 1000 }
    publish_status { 'Publish' }
    reserve_is_unlimited { false }
    enable_reserve_count { 1 }
    reserve_interval_number { 3 }
    reserve_interval_unit { 'Day' }
  end

  factory :three_times_every_two_week_reservable_plan, class: MonthlyPaymentPlan do
    name { '2週間に3回予約可能' }
    price { 5000 }
    publish_status { 'Publish' }
    reserve_is_unlimited { false }
    enable_reserve_count { 3 }
    reserve_interval_number { 2 }
    reserve_interval_unit { 'Week' }
  end
end
