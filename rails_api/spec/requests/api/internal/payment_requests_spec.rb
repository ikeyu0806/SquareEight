require 'rails_helper'

RSpec.describe 'Api::Internal::PaymentRequestsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:end_user) { create(:end_user) }
  let(:customer) { create(:customer, account_id: account.id) }
  let!(:stripe_payment_request) { create(:stripe_payment_request,
                                          account_id: account.id,
                                          end_user_id: end_user.id,
                                          customer_id: customer.id) }

  describe 'GET /api/internal/payment_requests' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/payment_requests'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/payment_requests'
        expect(response.status).to eq 401
      end
    end
  end
end
