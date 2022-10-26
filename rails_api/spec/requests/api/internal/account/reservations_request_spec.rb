require 'rails_helper'

RSpec.describe 'Api::Internal::Account::ReservationsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:customer) { create(:customer, account_id: account.id) }
  let(:reserve_frame) { create(:reserve_frame, account: account) }
  let!(:local_payment_reservation) { create(:local_payment_reservation, reserve_frame: reserve_frame, customer_id: customer.id) }

  describe 'GET /api/internal/account/reservations' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get "/api/internal/account/reservations?target_start_date=#{Time.zone.now.strftime("%Y/%m/%d")}&target_end_date=#{(Time.zone.now + 2.days).strftime("%Y/%m/%d")}"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/account/reservations'
        expect(response.status).to eq 401
      end
    end
  end
end
