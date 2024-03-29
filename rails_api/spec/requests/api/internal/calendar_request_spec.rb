require 'rails_helper'

RSpec.describe 'Api::Internal::CalendarController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:reserve_frame) { create(:reserve_frame, account: account) }

  describe 'GET /api/internal/calendar/:public_id/monthly_reserve_frames' do
    context 'not login as merchant_user' do
      it 'should return 200' do
        get "/api/internal/calendar/#{reserve_frame.public_id}/monthly_reserve_frames?target_year=#{Time.zone.now.year}&target_month=#{Time.zone.now.month}"
        expect(response.status).to eq 200
      end
    end
  end
end
