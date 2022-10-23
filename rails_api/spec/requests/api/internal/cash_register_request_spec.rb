require 'rails_helper'

RSpec.describe 'Api::Internal::CashRegistersController', type: :request do
  let(:end_user) { create(:end_user) }

  describe 'GET /api/internal/cash_register/index' do
    context 'login as end_user' do      
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_end_user).and_return(end_user)
        allow(end_user).to receive(:payment_methods).and_return("demo_id", ['ticket', 'payment'])
        get '/api/internal/carts/account_index'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/carts/account_index'
        expect(response.status).to eq 401
      end
    end
  end
end
