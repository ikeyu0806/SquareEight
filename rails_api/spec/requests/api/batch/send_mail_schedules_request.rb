require 'rails_helper'

RSpec.describe 'Api::Batch::SendMailSchedulesController', type: :request do
  describe 'send_same_hour_schedules' do
    let(:account) { create(:business_account) }
    let(:merchant_user) {
      create(:merchant_user, account: account)
    }
    let(:customer) {
      create(:customer, account_id: account.id)
    }
    let!(:send_mail_schedule) {
      create(:send_mail_schedule,
        account_id: account.id,
        merchant_user_id: merchant_user.id,
        customer_id: customer.id,
        scheduled_datetime: Time.zone.now) }
    it do
      post "/api/batch/send_mail_schedules/send_same_hour_schedules"
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)["send_mail_schedule_result"]).to eq 1
    end
  end
end
