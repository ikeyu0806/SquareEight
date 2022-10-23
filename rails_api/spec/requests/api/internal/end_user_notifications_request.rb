require 'rails_helper'

RSpec.describe 'Api::Internal::EndUserNotificationsController', type: :request do
  let(:end_user) { create(:end_user) }
  let!(:end_user_notification) { create(:end_user_notification, end_user: end_user) }

  describe 'GET get /api/internal/end_user_notifications' do
    context 'login as end_user' do      
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/end_user_notifications'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/end_user_notifications'
        expect(response.status).to eq 401
      end
    end
  end
end
