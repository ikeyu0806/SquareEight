require 'rails_helper'

RSpec.describe 'Api::Batch::SendLineSchedulesController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:line_official_account) {
    create(:line_official_account, account_id: account.id)
  }
  let(:line_user) {
    create(:line_user, account_id: account.id)
  }
  let!(:send_line_schedule) {
    create(:send_line_schedule,
      scheduled_datetime: Time.zone.now,
      merchant_user_id: merchant_user.id,
      account_id: account.id,
      line_official_account_id: line_official_account.id,
      line_user_id: line_user.id
    )
  }
  describe 'send_same_hour_schedules' do
    it do
      line_messaging_client_instance = double("line_messaging_client_instance")
      allow_any_instance_of(LineClientModule).to receive(:line_messaging_client).and_return(line_messaging_client_instance) 
      allow(line_messaging_client_instance).to receive(:push_message).and_return(true)
      post "/api/batch/send_line_schedules/send_same_hour_schedules"
      expect(response.status).to eq 200
    end
  end
end
