FactoryBot.define do
  factory :out_of_range_frame, class: OutOfRangeFrame do
    start_at { (Date.today + 3.days).beginning_of_day }
    end_at { (Date.today + 3.days).end_of_day }
  end
end
