require 'rails_helper'

RSpec.describe 'Api::Internal::EndUsersController', type: :request do
  let(:end_user) { create(:end_user) }
  let!(:end_user_notification) { create(:end_user_notification, end_user: end_user) }
  let!(:system_end_user_notification) { create(:system_end_user_notification) }
  let!(:delivery_target) { create(:delivery_target, end_user_id: end_user.id) }

  describe 'GET get /api/internal/end_users/customer_toppage_info' do
    context 'login as end_user' do      
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/end_users/customer_toppage_info'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/end_users/customer_toppage_info'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET get /api/internal/end_users/current_end_user_info' do
    context 'login as end_user' do      
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/end_users/current_end_user_info'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/end_users/current_end_user_info'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET get /api/internal/end_users/mypage_info' do
    context 'login as end_user' do      
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/end_users/mypage_info'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/end_users/mypage_info'
        expect(response.status).to eq 401
      end
    end
  end
end
