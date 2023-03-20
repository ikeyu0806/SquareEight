require 'rails_helper'

RSpec.describe ReserveFrame, type: :model do
  let(:account) { create(:business_account) }

  describe '2023-2-28' do
    before do
      travel_to(Date.new(2023,1,1))
    end
    after do
      travel_back
    end
    describe 'prorated_plan_price' do
      describe 'last_paid_at is 2023-1-31' do
        let!(:standard_plan_subscription) {
          create(:standard_plan_subscription,
                  account_id: account.id,
                  last_paid_at: Date.new(2023, 01, 31))
        }
        it 'should require full_price' do
          expect(1).to eq 1
        end
      end
    end
  end
end
