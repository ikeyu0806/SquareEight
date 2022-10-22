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
        get '/api/internal/accounts/account_info'
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        get '/api/internal/accounts/account_info'
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
    context 'register individual' do
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
      let(:params) {
        {
          account: {
            business_name: 'update_test',
            business_type: 'company',
            representative_phone_number: '09011112222',
            representative_birth_day: '2000-01-01'
         }
        }
      }

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
          allow(stripe_account_instance_double).to receive_message_chain(:company, :name=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :name_kanji=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :name_kana=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :tax_id=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :address_kanji, :state=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :address_kanji, :city=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :address_kanji, :town=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :address_kanji, :line1=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :address_kanji, :line2=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :address_kana, :state=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :address_kana, :city=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :address_kana, :town=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :address_kana, :line1=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :address_kana, :line2=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :phone=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :directors_provided=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :tos_acceptance, :date=).and_return(true)
          allow(stripe_account_instance_double).to receive_message_chain(:company, :tos_acceptance, :id=).and_return(true)
        end
      end
    end
  end

  describe 'POST /api/internal/accounts/register_stripe_bank_account' do
    let(:params) {
      {
        account: {
          account_number: '42424242424242',
          bank_code: '001',
          branch_code: '001',
          account_holder_name: 'hoge hugas'
       }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        stripe_external_account_instance_double = double('stripe_external_account_instance_double')
        allow(stripe_external_account_instance_double).to receive(:id).and_return("demo_id")
        allow(Stripe::Account).to receive(:create_external_account).and_return(stripe_external_account_instance_double)
        post '/api/internal/accounts/register_stripe_bank_account', params: params
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        post '/api/internal/accounts/register_stripe_bank_account', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'DELETE /api/internal/accounts/delete_bank_account' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow(Stripe::Account).to receive(:delete_external_account).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        delete '/api/internal/accounts/delete_bank_account/demo_id'
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        delete '/api/internal/accounts/delete_bank_account/demo_id'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/accounts/page_links' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/accounts/page_links'
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        get '/api/internal/accounts/page_links'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/accounts/:public_id/update_payment_method' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        allow(Stripe::Customer).to receive(:update).and_return(true)
        post '/api/internal/accounts/1234-abcd/update_payment_method'
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        post '/api/internal/accounts/1234-abcd/update_payment_method'
        expect(response.status).to eq 401
      end
    end
  end
  
  describe 'DELETE /api/internal/accounts/:payment_method_id/detach_stripe_payment_method' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow(Stripe::PaymentMethod).to receive(:detach).and_return(true)
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        delete '/api/internal/accounts/1234-abcd/detach_stripe_payment_method'
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        delete '/api/internal/accounts/1234-abcd/detach_stripe_payment_method'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/accounts/stripe_account_info' do
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

  describe 'GET /api/internal/accounts/stripe_payment_history' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/accounts/stripe_payment_history'
        expect(response.status).to eq 200
      end
    end

    context 'without login' do
      it 'should return 401' do
        get '/api/internal/accounts/stripe_payment_history'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/accounts/update_plan' do
    context 'upgrade plan Light to Standard' do
      let(:light_plan_account) { create(:business_account, stripe_subscription_id: light_plan_subscription.id) }
      let(:merchant_user) {
        create(:merchant_user, account: account)
      }
      let(:light_plan_subscription) { create(:light_plan_subscription, account_id: account.id) }
      let(:params) {
        {
          account: {
            service_plan: 'Standard'
         }
        }
      }

      context 'login as merchant_user' do
        it 'should return 200' do
          allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
          allow( Stripe::Subscription).to receive(:cancel).and_return(true)
          stripe_subscription_instance_double = double('stripe_subscription_instance_double')
          allow( Stripe::Subscription).to receive(:create).and_return(stripe_subscription_instance_double)
          allow(stripe_subscription_instance_double).to receive(:id).and_return(1)
          post '/api/internal/accounts/update_plan', params: params
          expect(response.status).to eq 200
        end
      end
  
      context 'without login' do
        it 'should return 401' do
          post '/api/internal/accounts/update_plan', params: params
          expect(response.status).to eq 401
        end
      end
    end
  end
end
