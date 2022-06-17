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
  end
end
