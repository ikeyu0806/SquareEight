require 'rails_helper'

RSpec.describe 'Api::Batch::ReservationsController', type: :request do
  let(:standard_plan_account) {
    create(:standard_plan_account)
  }
  let(:reserve_frame) {
    create(:reserve_frame, account_id: standard_plan_account.id)
  }
  let(:customer) {
    create(:customer, account_id: standard_plan_account.id)
  }
  describe 'remind_tommorow_notifications' do
    let!(:credit_card_payment_reservation) {
      create(:credit_card_payment_reservation,
              :tomorrow_reservation,
              reserve_frame_id: reserve_frame.id,
              customer_id: customer.id)
    }
    it 'should remind tomorrow reservations' do
      post "/api/batch/reservations/remind_tommorow_notifications"
      expect(response.status).to eq 200
    end
  end
end
