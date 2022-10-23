FactoryBot.define do
  factory :delivery_datetime_setting, class: DeliveryDatetimeSetting do
    shortest_delivery_day { 1 }
    longest_delivery_day { 10 }
    deadline_time { Time.new(2000, 01, 01, 19,00) }
    is_holiday_sun { true }
    is_holiday_sat { true }
    is_set_per_area_delivery_date { false }
    delivery_time_type { 'yamato' }
  end
end
