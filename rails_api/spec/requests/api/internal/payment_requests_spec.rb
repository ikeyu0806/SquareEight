require 'rails_helper'

RSpec.describe 'Api::Internal::PaymentRequestsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:end_user) { create(:end_user) }
  let(:customer) { create(:customer, account_id: account.id, end_user_id: end_user.id) }
  let(:customer_group) { create(:customer_group, account_id: account.id) }
  let!(:customer_group_relation) { create(:customer_group_relation, customer_id: customer.id, customer_group_id: customer_group.id) }
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

  describe 'GET /api/internal/payment_requests' do
    context 'not login' do
      it 'should return 200' do
        get "/api/internal/payment_requests/#{stripe_payment_request.public_id}"
        expect(response.status).to eq 200
      end
    end
  end

  describe 'GET /api/internal/payment_requests/init_state' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/payment_requests/init_state'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/payment_requests/init_state'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/payment_requests/send_payment_request_mail' do
    context 'login as merchant_user' do
      context 'target_type is registeredCustomer' do
        let(:params) {
          {
            payment_request: {
              target_customer_type: 'registeredCustomer',
              selected_customers: [customer],
              title: 'update_demo_title',
              content: 'update_demo_content'
            },
            customer: {
              first_name: 'デモ',
              last_name: '太郎',
              first_name_kana: 'デモ',
              last_name_kana: 'タロウ',
              email: 'demo@example.com',
              phone_number: '11122223333',
            }
          }
        }
        it 'should return 200' do
          allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
          post '/api/internal/payment_requests/send_payment_request_mail', params: params
          expect(response.status).to eq 200
        end
      end

      context 'target_type is newCustomer' do
        let(:params) {
          {
            payment_request: {
              target_customer_type: 'newCustomer',
              target_emails: 'demoa@example.com,demob@example.com',
              title: 'update_demo_title',
              content: 'update_demo_content',
              price: 1000
            },
            customer: {
              first_name: 'デモ',
              last_name: '太郎',
              first_name_kana: 'デモ',
              last_name_kana: 'タロウ',
              email: 'demo@example.com',
              phone_number: '11122223333',
            }
          }
        }
        it 'should return 200' do
          allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
          post '/api/internal/payment_requests/send_payment_request_mail', params: params
          expect(response.status).to eq 200
        end
      end

      context 'target_type is customerGroup' do
        let(:params) {
          {
            payment_request: {
              target_customer_type: 'customerGroup',
              selected_customer_groups: [customer_group],
              title: 'update_demo_title',
              content: 'update_demo_content'
            }
          }
        }
        it 'should return 200' do
          allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
          post '/api/internal/payment_requests/send_payment_request_mail', params: params
          expect(response.status).to eq 200
        end
      end
    end

    context 'not login' do
      let(:params) {
        {
          payment_request: {
            target_customer_type: 'customerGroup',
            selected_customer_groups: [customer_group],
            title: 'update_demo_title',
            content: 'update_demo_content'
          }
        }
      }
      it 'should return 401' do
        post '/api/internal/payment_requests/send_payment_request_mail', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/payment_requests/exec_payment' do
    let(:params) {
      {
        payment_request: {
          public_id: stripe_payment_request.public_id
        }
      }
    }
    context 'login as end_user' do
      it 'should return 200' do
        # Stripe::Customer
        stripe_customer_instance = double('stripe_customer_instance')
        allow(Stripe::Customer).to receive(:retrieve).and_return({"invoice_settings"=>{"default_payment_method"=>"pm_xxxx"}})
        allow(stripe_customer_instance).to receive(:id).and_return('demo_customer_id')
        # Stripe::PaymentIntent
        stripe_payment_intent_instance = double('stripe_payment_intent_instance')
        allow(Stripe::PaymentIntent).to receive(:create).and_return(stripe_payment_intent_instance)
        allow(stripe_payment_intent_instance).to receive(:id).and_return("demo_payment_intent_id")
        allow(Stripe::PaymentIntent).to receive(:confirm).and_return(true)

        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        post '/api/internal/payment_requests/exec_payment', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/payment_requests/exec_payment', params: params
        expect(response.status).to eq 401
      end
    end
  end
end
