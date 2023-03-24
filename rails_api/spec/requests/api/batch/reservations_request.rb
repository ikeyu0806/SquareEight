require 'rails_helper'

RSpec.describe 'Api::Batch::ReservationsController', type: :request do
  let(:standard_plan_account) {
    create(:standard_plan_account)
  }
  let(:customer) {
    create(:customer, account_id: standard_plan_account.id)
  }
  describe 'remind_tommorow_notifications' do
    let(:reserve_frame) {
      create(:reserve_frame, account_id: standard_plan_account.id)
    }
    let(:no_email_customer) {
      create(:customer,
              email: nil,
              account_id: standard_plan_account.id)
    }
    let!(:credit_card_payment_reservation) {
      create_list(:credit_card_payment_reservation, 5,
                  :tomorrow_reservation,
                  reserve_frame_id: reserve_frame.id,
                  customer_id: customer.id)
    }
    # emailがないcustomerはskip
    let!(:no_customer_reservation) {
      create(:credit_card_payment_reservation,
              :tomorrow_reservation,
              reserve_frame_id: reserve_frame.id,
              customer_id: no_email_customer.id)
    }
    it 'should remind tomorrow reservations' do
      post "/api/batch/reservations/remind_tommorow_notifications"
      expect(response.status).to eq 200
      target_reservations_response = JSON.parse(response.body)["target_reservations"]
      expect(target_reservations_response.length).to eq 5
    end
  end

  describe 'confirm_lottery_reservations' do
    let(:lottery_reception_reserve_frame) {
      create(:reserve_frame,
             :lottery_reception,
              lottery_confirmed_day_before: 3,
              capacity: 3,
              account_id: standard_plan_account.id)
    }

    let!(:local_payment_reservations) {
      create_list(:local_payment_reservation, 10,
                  :tomorrow_reservation,
                  reserve_frame_id: lottery_reception_reserve_frame.id,
                  customer_id: customer.id,
                  status: 'waitingForLotteryConfirm',
                  start_at: Time.zone.now + 3.days,
                  end_at: Time.zone.now + 3.days + 1.hours)
    }
    it do
      post "/api/batch/reservations/confirm_lottery_reservations"
      expect(response.status).to eq 200
      response_body = JSON.parse(response.body)
      expect(response_body["confirmed_reservations"]["#{lottery_reception_reserve_frame.id.to_s}_confirmed_reservations"].length).to eq(lottery_reception_reserve_frame.capacity)
      expect(response_body["lottery_lost_reservations"]["#{lottery_reception_reserve_frame.id.to_s}_lottery_lost_reservations"].length).to eq(lottery_reception_reserve_frame.reservations.count - lottery_reception_reserve_frame.capacity)
    end
  end
end
