require 'rails_helper'

RSpec.describe 'Api::Batch::SystemSubscriptionsController', type: :request do
  let(:standard_plan_account) {
    create(:standard_plan_account)
  }
  describe 'POST /api/batch/system_subscriptions/exec_payment' do
    describe 'current_datetime is 2023-2-28' do
      before do
        travel_to(Date.new(2023,2,28))
      end
      after do
        travel_back
      end
      describe 'last_paid_at is 2023-1-31' do
        let!(:standard_plan_subscription) {
          create(:standard_plan_subscription,
                  account_id: standard_plan_account.id,
                  billing_cycle_anchor_day: 31,
                  last_paid_at: Date.new(2023, 01, 31))
        }
        it do
          stripe_payment_intent_instance = double("stripe_payment_intent_instance")
          allow(Stripe::PaymentIntent).to receive(:create).and_return(stripe_payment_intent_instance)
          allow(Stripe::PaymentIntent).to receive(:confirm).and_return(true)
          allow(stripe_payment_intent_instance).to receive(:id).and_return("demo_id")
          post "/api/batch/system_subscriptions/exec_payment"
          expect(response.status).to eq 200
          response_body = JSON.parse(response.body)
          expect(response_body["target_payment_intents"].length).to eq 1
          expect(response_body["target_payment_intents"][0]["amount"]).to eq standard_plan_account.plan_price
        end
      end
    end
  end
end
