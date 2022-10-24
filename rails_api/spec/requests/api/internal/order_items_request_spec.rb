require 'rails_helper'

RSpec.describe 'Api::Internal::OrderItemsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:product_order_item) { create(:product_order_item) }
  let(:monthly_payment_plan_order_item) { create(:monthly_payment_plan_order_item) }
  let(:ticket_master_order_item) { create(:ticket_master_order_item) }

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
end
