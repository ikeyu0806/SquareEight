FactoryBot.define do
  factory :monthly_payment_plan, class: MonthlyPaymentPlan do
    name { '月額課金' }
    price { 1000 }
    publish_status { 'Publish' }
    reserve_is_unlimited { false }
    enable_reserve_count { 1 }
    reserve_interval_number { 1 }
    reserve_interval_unit { 'Week' }
  end
end
