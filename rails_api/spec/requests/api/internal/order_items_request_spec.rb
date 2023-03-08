require 'rails_helper'

RSpec.describe 'Api::Internal::OrderItemsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let!(:customer) { create(:customer, account_id: account.id, end_user_id: end_user.id) }
  let(:end_user) { create(:end_user) }
  let(:product) { create(:product, account: account) }
  let(:order) { create(:order, end_user_id: end_user.id) }
  let!(:product_order_item) { create(:product_order_item, account_id: account.id, order: order, product_id: product.id) }
  let!(:monthly_payment_plan_order_item) { create(:monthly_payment_plan_order_item, account_id: account.id, order: order) }
  let!(:ticket_master_order_item) { create(:ticket_master_order_item, account_id: account.id, order: order) }

  describe 'GET /api/internal/order_items' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/order_items'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/order_items'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/order_items/:public_id/update_shipped' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/order_items/#{product_order_item.public_id}/update_shipped"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/order_items/#{product_order_item.public_id}/update_shipped"
        expect(response.status).to eq 401
      end
    end
  end
end
