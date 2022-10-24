require 'rails_helper'

RSpec.describe 'Api::Internal::PurchasedTicketsRequestController', type: :request do
  let(:account) { create(:business_account) }
  let(:end_user) { create(:end_user) }
  let(:ticket_master) { create(:ticket_master, account: account) }
  let!(:purchased_ticket) { create(:purchased_ticket, ticket_master: ticket_master, end_user_id: end_user.id) }

  describe 'GET /api/internal/purchased_tickets' do
    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get '/api/internal/purchased_tickets'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/purchased_tickets'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/purchased_tickets/:public_id' do
    context 'login as end_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        get "/api/internal/purchased_tickets/#{purchased_ticket.public_id}"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get "/api/internal/purchased_tickets/#{purchased_ticket.public_id}"
        expect(response.status).to eq 401
      end
    end
  end
end
