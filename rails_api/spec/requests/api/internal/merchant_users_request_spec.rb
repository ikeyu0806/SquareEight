require 'rails_helper'

RSpec.describe 'Api::Internal::MerchantUserController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }

  describe 'POST /api/internal/merchant_users' do
    let(:params) {
      {
        merchant_user: {
         email: "create@test.com",
         name: "登録テスト",
         password: "Pass1234",
         authority_category: "RootUser",
         is_create_account: true
       }
      }
    }

    it 'should return 200' do
      post "/api/internal/merchant_users/invite_root_user", params: params
      expect(response.status).to eq 200
    end

    context 'email is nil' do
      let(:params) {
        {
          merchant_user: {
           name: "登録エラーテスト",
           password: "Pass1234",
           authority_category: "RootUser",
           is_create_account: true
         }
        }
      }
      it 'should return 500' do
        post "/api/internal/merchant_users/invite_root_user", params: params
        expect(response.status).to eq 500
      end
    end
  end

  describe 'POST /api/internal/:public_id/merchant_users' do
    let(:params) {
      {
        merchant_user: {
         name: "登録エラーテスト",
         password: "Pass1234",
         authority_category: "RootUser",
         is_create_account: true
        }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/merchant_users/#{merchant_user.public_id}/update", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/merchant_users/#{merchant_user.public_id}/update", params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/merchant_users/find_or_create_by_google_auth' do
    let(:params) {
      {
        merchant_user: {
          google_auth_email: 'google_auth@example.com',
          google_auth_id: 'google_auth_id_demo'
        }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/merchant_users/#{merchant_user.public_id}/update", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/merchant_users/#{merchant_user.public_id}/update", params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/merchant_users/confirm_verification_code' do
    let(:params) {
      {
        merchant_user: {
         email: Base64.urlsafe_encode64(merchant_user.email),
         verification_code: merchant_user.verification_code
       }
      }
    }

    context 'not login' do
      it 'should return 200' do
        post "/api/internal/merchant_users/confirm_verification_code", params: params
        expect(response.status).to eq 200
      end
    end

    context 'verification_code is invalid' do
      let(:params) {
        {
          merchant_user: {
           email: Base64.urlsafe_encode64(merchant_user.email),
           verification_code: "123123"
         }
        }
      }
      it 'should return 401' do
        post "/api/internal/merchant_users/confirm_verification_code", params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/merchant_users/confirm_update_email_verification_code' do
    let(:params) {
      {
        merchant_user: {
         email: Base64.urlsafe_encode64(merchant_user.email),
         verification_code: merchant_user.verification_code
       }
      }
    }

    context 'not login' do
      it 'should return 200' do
        post "/api/internal/merchant_users/confirm_update_email_verification_code", params: params
        expect(response.status).to eq 200
      end
    end
  end

  describe 'GET /api/internal/merchant_users/current_merchant_user_info' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/merchant_users/current_merchant_user_info'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/merchant_users/current_merchant_user_info'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'DELETE /api/internal/merchant_users/disconnect_google_auth' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        delete '/api/internal/merchant_users/disconnect_google_auth'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        delete '/api/internal/merchant_users/disconnect_google_auth'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/merchant_users/send_reset_password_email' do
    let(:params) {
      {
        merchant_user: {
         email: merchant_user.email
       }
      }
    }

    context 'not login' do
      it 'should return 200' do
        post "/api/internal/merchant_users/send_reset_password_email", params: params
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/merchant_users/update_password' do
    let(:params) {
      {
        merchant_user: {
         email: merchant_user.email
       }
      }
    }

    context 'not login' do
      it 'should return 200' do
        post "/api/internal/merchant_users/update_password", params: params
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/merchant_users/resend_verification_code' do
    let(:params) {
      {
        merchant_user: {
         email: disabled_merchant_user.email
       }
      }
    }

    let(:disabled_merchant_user) {
      create(:merchant_user, account: account, email_authentication_status: 'Disabled')
    }

    context 'not login' do
      it 'should return 200' do
        post "/api/internal/merchant_users/resend_verification_code", params: params
        expect(response.status).to eq 200
      end
    end
  end
end
