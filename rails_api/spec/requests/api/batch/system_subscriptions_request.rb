require 'rails_helper'

RSpec.describe 'Api::Batch::SystemSubscriptionsController', type: :request do
  let(:free_plan_account) {
    create(:free_plan_account)
  }
  let(:light_plan_account) {
    create(:light_plan_account)
  }
  let(:standard_plan_account) {
    create(:standard_plan_account)
  }
  let(:premium_plan_account) {
    create(:premium_plan_account)
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
        let!(:light_plan_subscription) {
          create(:light_plan_subscription,
                  account_id: light_plan_account.id,
                  billing_cycle_anchor_day: 31,
                  last_paid_at: Date.new(2023, 01, 31),
                  created_at: Date.new(2023,1,31))
        }
        let!(:standard_plan_subscription) {
          create(:standard_plan_subscription,
                  account_id: standard_plan_account.id,
                  billing_cycle_anchor_day: 31,
                  last_paid_at: Date.new(2023, 01, 31),
                  created_at: Date.new(2023,1,31))
        }
        let!(:premium_plan_subscription) {
          create(:premium_plan_subscription,
                  account_id: premium_plan_account.id,
                  billing_cycle_anchor_day: 31,
                  last_paid_at: Date.new(2023, 01, 31),
                  created_at: Date.new(2023,1,31))
        }
        it do
          stripe_payment_intent_instance = double("stripe_payment_intent_instance")
          allow(Stripe::Customer).to receive(:retrieve).and_return({"invoice_settings"=>{"default_payment_method"=>"pm_xxxx"}})
          allow(Stripe::PaymentIntent).to receive(:create).and_return(stripe_payment_intent_instance)
          allow(Stripe::PaymentIntent).to receive(:confirm).and_return(true)
          allow(stripe_payment_intent_instance).to receive(:id).and_return("demo_id")
          post "/api/batch/system_subscriptions/exec_payment"
          expect(response.status).to eq 200
          response_body = JSON.parse(response.body)
          target_subscription_response = response_body["target_subscriptions"]
          expect(target_subscription_response.length).to eq 3
          expect(target_subscription_response.find{|s| s["account_id"].eql?(light_plan_account.id)}["amount"]).to eq light_plan_account.plan_price
          expect(target_subscription_response.find{|s| s["account_id"].eql?(standard_plan_account.id)}["amount"]).to eq standard_plan_account.plan_price
          expect(target_subscription_response.find{|s| s["account_id"].eql?(premium_plan_account.id)}["amount"]).to eq premium_plan_account.plan_price
        end
      end
    end
  end
end
