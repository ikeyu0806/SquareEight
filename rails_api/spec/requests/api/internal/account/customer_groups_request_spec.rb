require 'rails_helper'

RSpec.describe 'Api::Internal::Account::CustomerGroupsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:customer) { create(:customer, account_id: account.id) }
  let(:customer_group) { create(:customer_group, account_id: account.id) }
  let!(:customer_group_relation) { create(:customer_group_relation, customer_id: customer.id, customer_group_id: customer_group.id) }

  describe 'GET /api/internal/account/customer_groups' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/account/customer_groups'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/account/customer_groups'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/account/customer_groups/:public_id' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/account/customer_groups/' + customer_group.public_id
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/account/customer_groups/' + customer_group.public_id
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/account/customer_groups' do
    let(:params) {
      {
        customer_group: {
          name: 'demo customer_group',
          selected_customers: [customer]
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/account/customer_groups', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/account/customer_groups', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/account/customer_groups' do
    let(:params) {
      {
        customer_group: {
          name: 'update demo customer_group',
          selected_customers: [customer]
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/account/customer_groups/#{customer_group.public_id}/update", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/account/customer_groups/#{customer_group.public_id}/update", params: params
        expect(response.status).to eq 401
      end
    end
  end
end
