require 'rails_helper'

RSpec.describe 'Api::Internal::ProductsRequestController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:end_user) { create(:end_user) }
  let!(:product) { create(:product, account: account) }

  describe 'GET /api/internal/products' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/products', params: { current_page: 1, display_count: 10 }
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/products', params: { current_page: 1, display_count: 10 }
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/products/:public_id' do
    context 'not login' do
      it 'should return 200' do
        get "/api/internal/products/#{product.public_id}"
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/products' do
    let(:params) {
      {
        product: {
          product: {
            name: 'demo_product',
            price: 1000
          }
        }.to_json
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/products', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/products', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/products/:public_id/update' do
    let(:params) {
      {
        product: {
          product: {
            name: 'demo_update_product',
            price: 2000,
            product_types: [],
            prefecture_delivery_charges: [],
            shops: []
          }
        }.to_json
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/products/#{product.public_id}/update", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/products/#{product.public_id}/update", params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/products/:public_id/purchase_info' do
    context 'not login' do
      it 'should return 200' do
        get "/api/internal/products/#{product.public_id}/purchase_info"
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/products/insert_cart' do
    let(:params) {
      {
        product: {
          public_id: product.public_id,
          purchase_quantity: 1,
          is_registered_address: true
        }
      }
    }
    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        post '/api/internal/products/insert_cart', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/products/insert_cart', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'DELETE /api/internal/products/:public_id' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        delete "/api/internal/products/#{product.public_id}"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        delete "/api/internal/products/#{product.public_id}"
        expect(response.status).to eq 401
      end
    end
  end
end
