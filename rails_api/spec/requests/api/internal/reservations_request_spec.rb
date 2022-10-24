require 'rails_helper'

RSpec.describe 'Api::Internal::ReservationsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:reserve_frame) { create(:reserve_frame, account: account) }

  describe 'POST /api/internal/reservations/insert_time_payment_method' do
    let(:params) {
      {
        reservations: {
          reservation_date: (Time.zone.now + 1.weeks).strftime("%Y-%m-%d"),
          time: (Time.zone.now + 1.weeks).strftime("%H:%M") + "-" + (Time.zone.now + 1.weeks + 1.hours).strftime("%H:%M"),
          reserve_frame_public_id: reserve_frame.public_id,
          reserve_count: 1,
          price: 1000,
          payment_method: 'localPayment',

        }
      }
    }
    context 'not login' do
      it 'should return 200' do
        post '/api/internal/reservations/insert_time_payment_method', params: params
        expect(response.status).to eq 200
      end
    end
  end
end
