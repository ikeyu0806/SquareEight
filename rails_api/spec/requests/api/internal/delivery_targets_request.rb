require 'rails_helper'

RSpec.describe 'Api::Internal::DeliveryTargetsController', type: :request do
  let(:account) { create(:business_account) }
  let(:end_user) { create(:end_user) }
  let!(:delivery_datetime_setting) { create(:delivery_datetime_setting, account: account) }

  describe 'GET /api/internal/delivery_targets' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/delivery_targets'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/delivery_targets'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/delivery_targets' do
    let(:params) {
      {
        delivery_target: {
          first_name: '太郎',
          last_name: 'デモ',
          postal_code: '1231234',
          state: '東京都',
          city: '目黒区',
          town: '目黒本町',
          line1: '一丁目'
        } 
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        post '/api/internal/delivery_targets', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/delivery_targets', params: params
        expect(response.status).to eq 401
      end
    end
  end
end
