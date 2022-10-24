require 'rails_helper'

RSpec.describe 'Api::Internal::MonthlyPaymentPlansController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
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
end
