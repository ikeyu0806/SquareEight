require 'rails_helper'

RSpec.describe ReserveFrame, type: :model do
  let(:account) { create(:business_account, trial_end_datetime: Time.zone.now - 100.years) }

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
                account_id: account.id,
                billing_cycle_anchor_datetime: Date.new(2023, 01, 31),
                last_paid_at: Date.new(2023, 01, 31))
      }
      describe 'require_full_bill' do
        it 'should return true' do
          expect(standard_plan_subscription.require_full_bill).to eq true
        end
      end
      describe 'prorated_plan_price' do
        it 'should require full_price' do
          expect(standard_plan_subscription.prorated_plan_price).to eq account.plan_price
        end
      end
    end

    describe 'last_paid_at is 2023-2-14' do
      let!(:standard_plan_subscription) {
        create(:standard_plan_subscription,
                account_id: account.id,
                billing_cycle_anchor_datetime: Date.new(2023, 01, 31),
                last_paid_at: Date.new(2023, 02, 14))
      }
      describe 'require_full_bill' do
        it 'should return true' do
          expect(standard_plan_subscription.require_full_bill).to eq false
        end
      end
      describe 'prorated_plan_price' do
        it 'should require split_price' do
          expect(standard_plan_subscription.prorated_plan_price).to eq account.plan_price
        end
      end
    end
  end
end
