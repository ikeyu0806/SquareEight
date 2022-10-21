require 'rails_helper'

RSpec.describe 'Api::Internal::AccountsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }

  describe 'GET /api/internal/accounts/account_info' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/accounts/stripe_account_info'
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        get '/api/internal/accounts/stripe_account_info'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/accounts/update' do
    let(:params) {
      {
        account: {
          business_name: 'update_test'
       }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/accounts/update', params: params
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        post '/api/internal/accounts/update', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/accounts/dashboard_contents' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/accounts/dashboard_contents'
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        get '/api/internal/accounts/dashboard_contents'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/accounts/payment_methods' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/accounts/payment_methods'
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        get '/api/internal/accounts/payment_methods'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/accounts/stripe_connected_account' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/accounts/stripe_connected_account'
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        get '/api/internal/accounts/stripe_connected_account'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/accounts/register_credit_card' do
    let(:params) {
      {
        account: {
          business_name: 'update_test'
       }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        stripe_customer_instance = double({id: 'stripe_customer_id_demo'})
        allow(Stripe::Customer).to receive(:create).and_return(stripe_customer_instance)

        allow(Stripe::PaymentMethod).to receive(:attach).and_return(true)

        allow(Stripe::Customer).to receive(:update).and_return(true)

        post '/api/internal/accounts/register_credit_card', params: params
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        post '/api/internal/accounts/register_credit_card', params: params
        expect(response.status).to eq 401
      end
    end
  end
  
end
