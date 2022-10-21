require 'rails_helper'

RSpec.describe 'Api::Internal::MerchantUserController', type: :request do
  describe 'POST /api/internal/merchant_users' do
    let(:params) {
      {
        merchant_user: {
         email: "create@test.com",
         name: "登録テスト",
         password: "Pass1234",
         authority_category: "MerchantAdmin",
         is_create_account: true
       }
      }
    }

    it 'should return 200' do
      post "/api/internal/merchant_users", params: params
      expect(response.status).to eq 200
    end

    context 'email is nil' do
      let(:params) {
        {
          merchant_user: {
           name: "登録エラーテスト",
           password: "Pass1234",
           authority_category: "MerchantAdmin",
           is_create_account: true
         }
        }
      }
      it 'should return 500' do
        post "/api/internal/merchant_users", params: params
        expect(response.status).to eq 500
      end
    end
  end

  describe 'POST /api/internal/merchant_users/confirm_verification_code' do
    let(:account) { create(:business_account) }
    let!(:merchant_user) {
      create(:merchant_user,
              account: account,
              verification_code: "123456",
              verification_code_expired_at: Time.zone.now + 1.days)
    }

    let(:params) {
      {
        merchant_user: {
         email: Base64.urlsafe_encode64(merchant_user.email),
         verification_code: merchant_user.verification_code
       }
      }
    }

    it 'should return 200' do
      post "/api/internal/merchant_users/confirm_verification_code", params: params
      expect(response.status).to eq 200
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
end
