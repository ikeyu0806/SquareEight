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

  factory :credit_card_payment_reservation, class: Reservation do
    start_at { Time.zone.now + 1.days }
    end_at { Time.zone.now + 1.days + 1.hours }
    number_of_people { 1 }
    status { 'confirm' }
    payment_method { 'localPayment' }
    price { 1000 }
    representative_first_name { 'demo' }
    representative_last_name { 'demo' }
  end

  trait :waiting_for_lottery_confirm do
    payment_method { 'waitingForLotteryConfirm' }
  end

  trait :tomorrow_reservation do
    start_at { Time.zone.now + 1.days + 1.hours }
    end_at { Time.zone.now + 1.days + 2.hours }
  end
end
