require 'rails_helper'


RSpec.describe 'Api::Internal::SendMailHistoriesController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:customer) {
    create(:customer, account_id: account.id)
  }
  let!(:send_mail_history) {
    create(:send_mail_history,
      account_id: account.id,
      merchant_user_id: merchant_user.id,
      customer_id: customer.id
    )
  }

  describe 'GET /api/internal/send_mail_histories' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get "/api/internal/send_mail_histories", params: { current_page: 1, display_count: 10 }
        expect(response.status).to eq 200
      end
    end

    context 'not login as merchant_user' do
      it 'should return 401' do
        get "/api/internal/send_mail_histories", params: { current_page: 1, display_count: 10 }
        expect(response.status).to eq 401
      end
    end
  end
end
