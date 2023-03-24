require 'rails_helper'

RSpec.describe 'Api::Batch::SendMailSchedulesController', type: :request do
  describe 'send_same_hour_schedules' do
    it do
      post "/api/batch/send_mail_schedules/send_same_hour_schedules"
      expect(response.status).to eq 200
    end
  end
end
