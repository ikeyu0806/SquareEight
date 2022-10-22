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

  describe 'POST /api/internal/accounts/register_stripe_business_info' do
    let(:params) {
      {
        account: {
          business_name: 'update_test',
          business_type: 'individual',
          individual_phone_number: '09011112222',
          individual_birth_day: '2000-01-01'
       }
      }
    }

    context 'register individual' do
      context 'login as merchant_user' do
        it 'should return 200' do
          allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
          stripe_account_instance_double = double('stripe_account_instance')
          allow(Stripe::Account).to receive(:create).and_return(stripe_account_instance_double)
          allow(stripe_account_instance_double).to receive_message_chain(:save).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:id).and_return(1)
          allow(stripe_account_instance_double).to receive_message_chain(:business_profile, :mcc=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:business_profile, :url=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:business_profile, :product_description=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:business_profile, :support_email=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :email=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :phone=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :gender=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :last_name_kanji=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :last_name_kana=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :first_name_kanji=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :first_name_kana=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :address_kanji, :postal_code=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :address_kanji, :state=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :address_kanji, :city=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :address_kanji, :town=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :address_kanji, :line1=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :address_kanji, :line2=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :address_kana, :postal_code=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :address_kana, :state=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :address_kana, :city=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :address_kana, :town=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :address_kana, :line1=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :address_kana, :line2=).and_return(true)

          allow(stripe_account_instance_double).to receive_message_chain(:individual, :dob, :year=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :dob, :month=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:individual, :dob, :day=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:tos_acceptance, :date=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:tos_acceptance, :ip=).and_return(true)

          post '/api/internal/accounts/register_stripe_business_info', params: params
          expect(response.status).to eq 200
        end
      end
  
      context 'without login' do
        it 'should return 401' do
          post '/api/internal/accounts/register_stripe_business_info', params: params
          expect(response.status).to eq 401
        end
      end
    end

    context 'register company' do
    end
  end
  
end
