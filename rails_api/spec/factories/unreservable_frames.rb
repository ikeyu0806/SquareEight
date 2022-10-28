FactoryBot.define do
  factory :unreservable_frame, class: UnreservableFrame do
    start_at { Date.today.beginning_of_day }
    end_at { Date.today.end_of_day }
  end
end
