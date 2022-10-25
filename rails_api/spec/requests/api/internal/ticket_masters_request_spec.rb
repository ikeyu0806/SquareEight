require 'rails_helper'

RSpec.describe 'Api::Internal::ProductsRequestController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:ticket_master) { create(:ticket_master, account_id: account.id) }

  describe 'GET /api/internal/ticket_masters' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/ticket_masters'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/ticket_masters'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/products/:public_id' do
    context 'not login' do
      it 'should return 200' do
        get "/api/internal/ticket_masters/#{ticket_master.public_id}"
        expect(response.status).to eq 200
      end
    end
  end

end
