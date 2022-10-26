require 'rails_helper'

RSpec.describe 'Api::Internal::Account::CustomersController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:end_user) { create(:end_user) }
  let(:order) { create(:order, end_user_id: end_user.id) }
  let!(:product_order_item) { create(:product_order_item, account_id: account.id, order: order) }
  let!(:monthly_payment_plan_order_item) { create(:monthly_payment_plan_order_item, account_id: account.id, order: order) }
  let!(:ticket_master_order_item) { create(:ticket_master_order_item, account_id: account.id, order: order) }

  describe 'GET /api/internal/account/orders/:public_id' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get "/api/internal/account/orders/#{order.public_id}"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get "/api/internal/account/orders/#{order.public_id}"
        expect(response.status).to eq 401
      end
    end
  end
end
