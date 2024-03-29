require 'rails_helper'

RSpec.describe 'Api::Internal::AccountNotificationsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }

  describe 'GET /api/internal/account_notifications' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/account_notifications', params: { current_page: 1, display_count: 10 }
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        get '/api/internal/account_notifications', params: { current_page: 1, display_count: 10 }
        expect(response.status).to eq 401
      end
    end
  end
end
