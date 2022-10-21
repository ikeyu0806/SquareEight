require 'rails_helper'

RSpec.describe 'Api::Internal::AccountNotificationsController', type: :request do
  describe 'GET /api/internal/account_notifications' do
    context 'without login' do
      it 'should return 401' do
        get '/api/internal/account_notifications'
        expect(response.status).to eq 401
      end
    end
  end
end
