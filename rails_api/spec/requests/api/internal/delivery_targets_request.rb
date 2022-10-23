require 'rails_helper'

RSpec.describe 'Api::Internal::DeliveryTargetsController', type: :request do
  let(:account) { create(:business_account) }
  let(:end_user) { create(:end_user) }

  describe 'GET /api/internal/delivery_targets' do
    let!(:delivery_datetime_setting) { create(:delivery_datetime_setting, account: account) }
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
end
