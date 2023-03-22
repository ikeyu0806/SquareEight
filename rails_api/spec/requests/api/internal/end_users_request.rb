require 'rails_helper'

RSpec.describe 'Api::Internal::EndUsersController', type: :request do
  let(:end_user) { create(:end_user) }
  let!(:end_user_notification) { create(:end_user_notification, end_user: end_user) }
  let!(:system_end_user_notification) { create(:system_end_user_notification) }
  let!(:delivery_target) { create(:delivery_target, end_user_id: end_user.id) }
  let(:account) { create(:business_account) }

  describe 'GET get /api/internal/end_users/customer_toppage_info' do
    context 'login as end_user' do      
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/end_users/customer_toppage_info'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/end_users/customer_toppage_info'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET get /api/internal/end_users/current_end_user_info' do
    context 'login as end_user' do      
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/end_users/current_end_user_info'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/end_users/current_end_user_info'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET get /api/internal/end_users/mypage_info' do
    context 'login as end_user' do      
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/end_users/mypage_info'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/end_users/mypage_info'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET get /api/internal/end_users/payment_methods' do
    context 'login as end_user' do      
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/end_users/payment_methods'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/end_users/payment_methods'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/end_users' do
    let(:params) {
      {
        end_user: {
         email: "create@test.com",
         password: "Pass1234",
         first_name: "太郎",
         last_name: "デモ"
       }
      }
    }

    context 'not login' do
      it 'should return 200' do
        post '/api/internal/end_users', params: params
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/end_users/:public_id/update' do
    let(:params) {
      {
        end_user: {
         email: "update@test.com",
         password: "Pass123456",
         first_name: "更新",
         last_name: "デモ"
       }
      }
    }

    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        post "/api/internal/end_users/#{end_user.public_id}/update", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/end_users/#{end_user.public_id}/update", params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/end_users/find_or_create_by_google_auth' do
    let(:params) {
      {
        end_user: {
          google_auth_email: "google_auth@test.com",
          google_auth_id: "google_auth_id"
       }
      }
    }

    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        post '/api/internal/end_users/find_or_create_by_google_auth', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 200' do
        post '/api/internal/end_users/find_or_create_by_google_auth', params: params
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/end_users/confirm_verification_code' do
    let(:params) {
      {
        end_user: {
         email: Base64.urlsafe_encode64(end_user.email),
         verification_code: end_user.verification_code,
       }
      }
    }

    context 'not login' do
      it 'should return 200' do
        post '/api/internal/end_users/confirm_verification_code', params: params
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/end_users/confirm_update_email_verification_code' do
    let(:params) {
      {
        end_user: {
         email: Base64.urlsafe_encode64(end_user.email),
         verification_code: end_user.verification_code,
       }
      }
    }

    context 'not login' do
      it 'should return 200' do
        post '/api/internal/end_users/confirm_update_email_verification_code', params: params
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/end_users/register_credit_card' do
    let(:params) {
      {
        end_user: {
          payment_method_id: 'payment_,method_id_demo'
       }
      }
    }

    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        stripe_customer_instance = double({id: 'stripe_customer_id_demo'})
        allow(Stripe::Customer).to receive(:create).and_return(stripe_customer_instance)
        allow(Stripe::Customer).to receive(:update).and_return(true)
        allow(Stripe::PaymentMethod).to receive(:attach).and_return(true)
        post '/api/internal/end_users/register_credit_card', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/end_users/register_credit_card', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/end_users/update_payment_method' do
    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        allow(Stripe::Customer).to receive(:update).and_return(true)
        post "/api/internal/end_users/#{'payment_method__demo'}/update_payment_method"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/end_users/#{'payment_method__demo'}/update_payment_method"
        expect(response.status).to eq 401
      end
    end
  end

  describe 'DELETE /api/internal/end_users/detach_stripe_payment_method' do
    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        allow(Stripe::PaymentMethod).to receive(:detach).and_return(true)
        delete "/api/internal/end_users/#{'payment_method__demo'}/detach_stripe_payment_method"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        delete "/api/internal/end_users/#{'payment_method__demo'}/detach_stripe_payment_method"
        expect(response.status).to eq 401
      end
    end
  end

  describe 'DELETE /api/internal/end_users/disconnect_google_auth' do
    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        delete '/api/internal/end_users/disconnect_google_auth'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        delete '/api/internal/end_users/disconnect_google_auth'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'DELETE get /api/internal/end_users/cancel_subscription' do
    let(:monthly_payment_plan) { create(:monthly_payment_plan, account: account) }
    let(:merchant_stripe_subscription) {
      create(:merchant_stripe_subscription,
              monthly_payment_plan_id: monthly_payment_plan.id,
              end_user: end_user)
    }
    context 'login as end_user' do      
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        delete "/api/internal/end_users/#{merchant_stripe_subscription.public_id}/cancel_subscription"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        delete "/api/internal/end_users/#{merchant_stripe_subscription.public_id}/cancel_subscription"
        expect(response.status).to eq 401
      end
    end
  end
end
