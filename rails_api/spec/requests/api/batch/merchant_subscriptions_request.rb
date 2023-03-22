require 'rails_helper'

RSpec.describe 'Api::Batch::MerchantSubscriptionsController', type: :request do
  let(:standard_plan_account) {
    create(:standard_plan_account)
  }
  let(:end_user) { create(:end_user) }
  describe 'POST /api/batch/merchant_subscriptions/exec_payment' do
    describe 'current_datetime is 2023-2-28' do
      before do
        travel_to(Date.new(2023,2,28))
      end
      after do
        travel_back
      end
      describe 'last_paid_at is 2023-1-31' do
        let!(:merchant_stripe_subscription) {
          create(:merchant_stripe_subscription,
                  monthly_payment_plan_id: monthly_payment_plan.id,
                  end_user_id: end_user.id,
                  billing_cycle_anchor_day: 31,
                  last_paid_at: Date.new(2023, 01, 31),
                  created_at: Date.new(2023,1,31))
        }
        let(:monthly_payment_plan) {create(:monthly_payment_plan, account: standard_plan_account) }
        it do
          stripe_payment_intent_instance = double("stripe_payment_intent_instance")
          allow(Stripe::Customer).to receive(:retrieve).and_return({"invoice_settings"=>{"default_payment_method"=>"pm_xxxx"}})
          allow(Stripe::PaymentIntent).to receive(:create).and_return(stripe_payment_intent_instance)
          allow(Stripe::PaymentIntent).to receive(:confirm).and_return(true)
          allow(stripe_payment_intent_instance).to receive(:id).and_return("demo_id")
          post "/api/batch/merchant_subscriptions/exec_payment"
          expect(response.status).to eq 200
          response_body = JSON.parse(response.body)
          expect(response_body["target_subscriptions"].length).to eq 1
          expect(response_body["target_subscriptions"][0]["amount"]).to eq monthly_payment_plan.price
        end
      end
    end
  end
end
