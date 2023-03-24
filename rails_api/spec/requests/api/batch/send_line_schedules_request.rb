require 'rails_helper'

RSpec.describe 'Api::Batch::SendLineSchedulesController', type: :request do
  let(:standard_plan_account) {
    create(:standard_plan_account)
  }
  describe 'send_same_hour_schedules' do
    it do
      post "/api/batch/send_line_schedules/send_same_hour_schedules"
      expect(response.status).to eq 200
    end
  end
end
