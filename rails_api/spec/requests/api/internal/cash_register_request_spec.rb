require 'rails_helper'

RSpec.describe 'Api::Internal::CashRegistersController', type: :request do
  let(:end_user) { create(:end_user) }
  let!(:delivery_target) { create(:delivery_target, end_user_id: end_user.id) }
  let(:account) { create(:business_account) }

  describe 'GET /api/internal/cash_register/index' do
    context 'login as end_user' do      
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        allow(end_user).to receive(:payment_methods).and_return("demo_id", ['ticket', 'payment'])
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

  describe 'POST /api/internal/cash_registers/purchase' do
    let(:product) { create(:product, account: account) }
    let!(:cart_product) {
      create(:cart_product, account: account, end_user: end_user, product: product)
    }
    let!(:shipping_fee_tokyo) { create(:shipping_fee_tokyo, product_id: product.id) }
    let(:ticket_master) { create(:ticket_master, account: account) }
    let!(:cart_ticket_master) {
      create(:cart_ticket_master, account: account, end_user: end_user, ticket_master: ticket_master)
    }
    let(:monthly_payment_plan) { create(:monthly_payment_plan, account: account) }
    let!(:cart_monthly_payment_plan) {
      create(:cart_monthly_payment_plan, account: account, end_user: end_user, monthly_payment_plan: monthly_payment_plan)
    }
    let(:params) {
      {
        cash_register: {
          delivery_date_text: '指定なし'
        }
      }
    }
    context 'login as end_user' do     
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        stripe_payment_intent_instance = double("stripe_payment_intent_instance")
        allow(Stripe::Customer).to receive(:retrieve).and_return({"invoice_settings"=>{"default_payment_method"=>"pm_xxxx"}})
        allow(Stripe::PaymentIntent).to receive(:retrieve).and_return(true)
        allow(stripe_payment_intent_instance).to receive(:id).and_return("demo_id")
        allow(Stripe::PaymentIntent).to receive(:create).and_return(stripe_payment_intent_instance)
        allow(Stripe::PaymentIntent).to receive(:confirm).and_return(true)
        post '/api/internal/cash_registers/purchase', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/cash_registers/purchase', params: params
        expect(response.status).to eq 401
      end
    end
  end
end
