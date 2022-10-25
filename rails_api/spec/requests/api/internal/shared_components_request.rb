require 'rails_helper'

RSpec.describe 'Api::Internal::SharedComponentsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let!(:shared_components) { create(:shared_components, account_id: account.id) }

  describe 'GET /api/internal/shared_components' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/shared_components'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/shared_components'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/shared_components/register' do
    let(:params) {
      {
        shared_component: {
          navbar_brand_text: 'Update Test',
          navbar_brand_type: 'text',
          navbar_brand_background_color: 'dark',
          navbar_brand_variant_color: 'dark',
          footer_copyright_text: 'Update Test'
        }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/shared_components/register', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/shared_components/register', params: params
        expect(response.status).to eq 401
      end
    end
  end
end
