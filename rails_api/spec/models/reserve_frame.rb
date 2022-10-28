require 'rails_helper'

RSpec.describe ReserveFrame, type: :model do
  let(:account) { create(:business_account) }
  let(:reserve_frame) { create(:reserve_frame, account: account) }

  describe 'payment_methods' do
    it 'should return expect value' do
      payment_methods = reserve_frame.payment_methods
      expect(payment_methods[:local_payment_price]).to eq 1000
      expect(payment_methods[:credit_card_payment_price]).to eq 1000
    end
  end
end
