require 'rails_helper'

RSpec.describe 'Api::Internal::Account::CustomersController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:customer) { create(:customer, account_id: account.id) }

  describe 'GET /api/internal/account/customers' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/account/customers'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/account/customers'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/account/customers' do
    let(:params) {
      {
        customer: {
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
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/account/customers', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/account/customers', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/account/customers/:public_id/update' do
    let(:params) {
      {
        customer: {
          first_name: '更新デモ',
          last_name: '太郎',
          first_name_kana: 'デモ',
          last_name_kana: 'タロウ',
          email: 'update_demo@example.com',
          phone_number: '11122223333',
          notes: 'memo'
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/account/customers/#{customer.public_id}/update", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/account/customers/#{customer.public_id}/update", params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/account/customers/:customer_public_id/orders' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get "/api/internal/account/customers/#{customer.public_id}/orders"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get "/api/internal/account/customers/#{customer.public_id}/orders"
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/account/customers/:customer_public_id/charges' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get "/api/internal/account/customers/#{customer.public_id}/charges"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get "/api/internal/account/customers/#{customer.public_id}/charges"
        expect(response.status).to eq 401
      end
    end
  end
end
