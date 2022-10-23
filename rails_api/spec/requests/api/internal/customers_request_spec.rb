require 'rails_helper'

RSpec.describe 'Api::Internal::CustomersController', type: :request do
  describe 'POST /api/internal/customers' do
    let(:params) {
      {
        customers: {
          first_name: 'デモ',
          last_name: '太郎',
          first_name_kana: 'デモ',
          last_name_kana: 'タロウ',
          email: 'demo@example.com',
          phone_number: '11122223333',
          notes: 'memo'
        }
      }
    }
    let(:account) { create(:business_account) }
    let(:merchant_user) {
      create(:merchant_user, account: account)
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/customers', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/customers', params: params
        expect(response.status).to eq 401
      end
    end
  end
end
