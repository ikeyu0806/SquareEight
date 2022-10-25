require 'rails_helper'

RSpec.describe 'Api::Internal::SystemAccountNotificationsController', type: :request do
  let(:account) { create(:business_account) }
  let(:end_user) { create(:end_user) }
  let(:system_admin_user) { create(:system_admin_user) }
  let(:system_end_user_notification) { create(:system_end_user_notification) }

  describe 'GET /api/internal/system_end_user_notifications' do
    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/system_end_user_notifications'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/system_end_user_notifications'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/system_end_user_notifications' do
    let(:params) {
      {
        notification: {
          title: 'test title',
          content: 'test content'
        }
      }
    }

    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_system_admin_user).and_return(system_admin_user)
        post '/api/internal/system_end_user_notifications', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/system_end_user_notifications', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/system_end_user_notifications' do
    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/system_end_user_notifications/' + system_end_user_notification.public_id
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/system_end_user_notifications/' + system_end_user_notification.public_id
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/system_end_user_notifications' do
    let(:params) {
      {
        notification: {
          title: 'update title',
          content: 'update content'
        }
      }
    }

    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_system_admin_user).and_return(system_admin_user)
        post '/api/internal/system_end_user_notifications/' + system_end_user_notification.public_id, params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/system_end_user_notifications/' + system_end_user_notification.public_id, params: params
        expect(response.status).to eq 401
      end
    end
  end
end
