require 'rails_helper'

RSpec.describe 'Api::Internal::ShopsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let!(:shop) { create(:shop, account_id: account.id) }

  describe 'GET /api/internal/shops' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/shops'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/shops'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/shops/related_data' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get "/api/internal/shops/related_data"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get "/api/internal/shops/related_data"
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/shops' do
    let(:params) {
      {
        name: "テスト店舗",
        phone_number: "09011112222",
        business_hours_text: "07:00～22:00。不定休"
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/shops', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/shops', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/shops/:public_id/update' do
    let(:params) {
      {
        name: "テスト店舗",
        phone_number: "09011112222",
        business_hours_text: "07:00～22:00。不定休"
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/shops/#{shop.public_id}/update", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/shops/#{shop.public_id}/update", params: params
        expect(response.status).to eq 401
      end
    end
  end
end
