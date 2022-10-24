require 'rails_helper'

RSpec.describe 'Api::Internal::MonthlyPaymentPlansController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:end_user) { create(:end_user) }
  let!(:monthly_payment_plan) { create(:monthly_payment_plan, account: account) }

  describe 'GET /api/internal/monthly_payment_plans' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/monthly_payment_plans'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/monthly_payment_plans'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/monthly_payment_plan/:public_id' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get "/api/internal/monthly_payment_plans/#{monthly_payment_plan.public_id}"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get "/api/internal/monthly_payment_plans/#{monthly_payment_plan.public_id}"
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/monthly_payment_plans/:public_id/purchase_info' do
    context 'not login' do
      it 'should return 200' do
        get "/api/internal/monthly_payment_plans/#{monthly_payment_plan.public_id}/purchase_info"
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/monthly_payment_plans' do
    let(:params) {
      {
        monthly_payment_plans: {
          name: 'demo_name',
          price: 1000,
          reserve_is_unlimited: false,
          enable_reserve_count: 1,
          reserve_interval_number: 1,
          reserve_interval_unit: 'Week',
          publish_status: 'Publish',
        }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        stripe_product_instance = double('stripe_product_instance')
        stripe_plan_instance = double('stripe_plan_instance')
        allow(Stripe::Product).to receive(:create).and_return(stripe_product_instance)
        allow(Stripe::Plan).to receive(:create).and_return(stripe_plan_instance)
        allow(stripe_product_instance).to receive(:id).and_return('demo_id')
        allow(stripe_plan_instance).to receive(:id).and_return('demo_id')
        post '/api/internal/monthly_payment_plans', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/monthly_payment_plans', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/:public_id/monthly_payment_plans' do
    let(:params) {
      {
        monthly_payment_plans: {
          name: 'update_demo_name',
          price: 1000,
          reserve_is_unlimited: false,
          enable_reserve_count: 2,
          reserve_interval_number: 2,
          reserve_interval_unit: 'Week',
          publish_status: 'Publish',
        }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/monthly_payment_plans/#{monthly_payment_plan.public_id}/update", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/monthly_payment_plans/#{monthly_payment_plan.public_id}/update", params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/monthly_payment_plans/insert_cart' do
    let(:params) {
      {
        monthly_payment_plans: {
          public_id: monthly_payment_plan.public_id,
          purchase_quantity: 1
        }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        post '/api/internal/monthly_payment_plans/insert_cart', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/monthly_payment_plans/insert_cart', params: params
        expect(response.status).to eq 401
      end
    end
  end
end
