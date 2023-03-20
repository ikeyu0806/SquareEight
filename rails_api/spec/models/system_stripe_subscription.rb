require 'rails_helper'

RSpec.describe ReserveFrame, type: :model do
  let(:standard_plan_account) {
    create(:standard_plan_account)
  }

  # irregular end_of_month test
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
          expect(standard_plan_subscription.prorated_plan_price).to eq standard_plan_account.plan_price
        end
      end
    end

    describe 'last_paid_at is 2023-2-14' do
      let!(:standard_plan_subscription) {
        create(:standard_plan_subscription,
                account_id: standard_plan_account.id,
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
          expect(standard_plan_subscription.prorated_plan_price).to eq 1390
        end
      end
      describe 'last_paid_at_to_today_days' do
        it 'should return 14' do
          expect(standard_plan_subscription.last_paid_at_to_today_days).to eq 14
        end
      end
    end
  end
end
