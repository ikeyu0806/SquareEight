require 'rails_helper'

RSpec.describe 'Api::Internal::CartsController', type: :request do
  let(:end_user) { create(:end_user) }
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }

  describe 'GET /api/internal/carts/account_index' do
    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/carts/account_index'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/carts/account_index'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'DELETE /api/internal/carts/delete_cart_item/:public_id' do
    context 'login as end_user' do
      context 'delete cart_product' do
        let(:product) { create(:product, account: account) }
        let!(:cart_product) {
          create(:cart_product, account: account, end_user: end_user, product: product)
        }
        let(:params) {
          {
            item_type: 'Product'
          }
        }
        it 'should return 200' do
          allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
          delete "/api/internal/carts/delete_cart_item/#{cart_product.public_id}", params: params
          expect(response.status).to eq 200
        end
      end

      context 'delete cart_ticket_master' do
        let(:ticket_master) { create(:ticket_master, account: account) }
        let!(:cart_ticket_master) {
          create(:cart_ticket_master, account: account, end_user: end_user, ticket_master: ticket_master)
        }
        let(:params) {
          {
            item_type: 'TicketMaster'
          }
        }
        it 'should return 200' do
          allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
          delete "/api/internal/carts/delete_cart_item/#{cart_ticket_master.public_id}", params: params
          expect(response.status).to eq 200
        end
      end

      context 'delete cart_monthly_payment_plan' do
        let(:monthly_payment_plan) { create(:monthly_payment_plan, account: account) }
        let!(:cart_monthly_payment_plan) {
          create(:cart_monthly_payment_plan, account: account, end_user: end_user, monthly_payment_plan: monthly_payment_plan)
        }
        let(:params) {
          {
            item_type: 'MonthlyPaymentPlan'
          }
        }
        it 'should return 200' do
          allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
          delete "/api/internal/carts/delete_cart_item/#{cart_monthly_payment_plan.public_id}", params: params
          expect(response.status).to eq 200
        end
      end
    end

    context 'not login' do
      it 'should return 401' do
        delete "/api/internal/carts/delete_cart_item/hoge"
        expect(response.status).to eq 401
      end
    end
  end
end
