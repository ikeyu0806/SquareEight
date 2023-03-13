FactoryBot.define do
  factory :monthly_payment_reservation, class: Reservation do
    start_at { Time.zone.now + 1.days }
    end_at { Time.zone.now + 1.days + 1.hours }
    number_of_people { 1 }
    status { 'confirm' }
    payment_method { 'monthlyPaymentPlan' }
    representative_first_name { 'demo' }
    representative_last_name { 'demo' }
  end

  factory :local_payment_reservation, class: Reservation do
    start_at { Time.zone.now + 1.days }
    end_at { Time.zone.now + 1.days + 1.hours }
    number_of_people { 1 }
    status { 'confirm' }
    payment_method { 'localPayment' }
    price { 1000 }
    representative_first_name { 'demo' }
    representative_last_name { 'demo' }
  end
end
