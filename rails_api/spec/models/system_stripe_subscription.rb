require 'rails_helper'

RSpec.describe SystemStripeSubscription, type: :model do
  let(:standard_plan_account) {
    create(:standard_plan_account)
  }
  let(:end_user) { create(:end_user) }
  let(:monthly_payment_plan) {create(:monthly_payment_plan, account: standard_plan_account) }
  # irregular end_of_month test
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
      describe 'require_full_bill' do
        it 'should return true' do
          expect(merchant_stripe_subscription.require_full_bill).to eq true
        end
      end
      describe 'prorated_plan_price' do
        it 'should require full_price' do
          expect(merchant_stripe_subscription.prorated_plan_price(monthly_payment_plan.price)).to eq monthly_payment_plan.price
        end
      end
    end

    describe 'last_paid_at is 2023-2-14' do
      let!(:merchant_stripe_subscription) {
        create(:merchant_stripe_subscription,
                monthly_payment_plan_id: monthly_payment_plan.id,
                end_user_id: end_user.id,
                billing_cycle_anchor_day: 31,
                last_paid_at: Date.new(2023, 02, 14),
                created_at: Date.new(2023,1,31))
      }
      describe 'require_full_bill' do
        it 'should return true' do
          expect(merchant_stripe_subscription.require_full_bill).to eq false
        end
      end
      describe 'prorated_plan_price' do
        it 'should require split_price' do
          expect(merchant_stripe_subscription.prorated_plan_price(monthly_payment_plan.price)).to eq 466
        end
      end
      describe 'last_paid_at_to_today_days' do
        it 'should return 14' do
          expect(merchant_stripe_subscription.last_paid_at_to_today_days).to eq 14
        end
      end
    end
  end
end
