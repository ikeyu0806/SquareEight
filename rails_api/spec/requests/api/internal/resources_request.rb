require 'rails_helper'

RSpec.describe 'Api::Internal::ResourcesController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let!(:room_resource) { create(:room_resource, account_id: account.id) }

  describe 'GET /api/internal/resources' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/resources'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/resources'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/resources/:public_id/edit' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get "/api/internal/resources/#{room_resource.public_id}/edit"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get "/api/internal/resources/#{room_resource.public_id}/edit"
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/resources' do
    let(:params) {
      {
        resources: {
          name: '山田花子',
          quantity: 5
        }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/resources', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/resources', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/resources/:public_id/update' do
    let(:params) {
      {
        resources: {
          name: '会議室更新',
          quantity: 15
        }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/resources/#{room_resource.public_id}/update", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/resources/#{room_resource.public_id}/update", params: params
        expect(response.status).to eq 401
      end
    end
  end
end
