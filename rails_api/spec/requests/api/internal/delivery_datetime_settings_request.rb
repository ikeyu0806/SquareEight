require 'rails_helper'

RSpec.describe 'Api::Internal::DeliveryDatetimeSettingsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }

  describe 'GET /api/internal/delivery_datetime_settings' do
    let!(:delivery_datetime_setting) { create(:delivery_datetime_setting, account: account) }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/delivery_datetime_settings'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/delivery_datetime_settings'
        expect(response.status).to eq 401
      end
    end
  end
end
