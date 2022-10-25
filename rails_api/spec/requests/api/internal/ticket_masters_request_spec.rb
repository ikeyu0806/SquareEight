require 'rails_helper'

RSpec.describe 'Api::Internal::ticket_mastersRequestController', type: :request do
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

  describe 'GET /api/internal/ticket_masters/:public_id' do
    context 'not login' do
      it 'should return 200' do
        get "/api/internal/ticket_masters/#{ticket_master.public_id}"
        expect(response.status).to eq 200
      end
    end
  end

  describe 'GET /api/internal/ticket_masters/:public_id/purchase_info' do
    context 'not login' do
      it 'should return 200' do
        get "/api/internal/ticket_masters/#{ticket_master.public_id}/purchase_info"
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/ticket_masters' do
    let(:params) {
      {
        ticket_master: {
          name: 'demo_ticket_master',
          price: 1000,
          issue_number: 100,
          effective_month: 12
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/ticket_masters', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/ticket_masters', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/ticket_masters/:public_id/update' do
    let(:params) {
      {
        ticket_master: {
          name: 'demo_ticket_master',
          price: 1000,
          issue_number: 100,
          effective_month: 12
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/ticket_masters/#{ticket_master.public_id}/update", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/ticket_masters/#{ticket_master.public_id}/update", params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'DELETE /api/internal/ticket_masters/:public_id' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        delete "/api/internal/ticket_masters/#{ticket_master.public_id}"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        delete "/api/internal/ticket_masters/#{ticket_master.public_id}"
        expect(response.status).to eq 401
      end
    end
  end
end
