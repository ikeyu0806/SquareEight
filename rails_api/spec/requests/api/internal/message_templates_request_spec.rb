require 'rails_helper'

RSpec.describe 'Api::Internal::MessageTemplatesController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:customer) { create(:customer, account_id: account.id) }
  let(:customer_group) { create(:customer_group, account_id: account.id) }
  let!(:customer_group_relation) { create(:customer_group_relation, customer_id: customer.id, customer_group_id: customer_group.id) }

  describe 'GET /api/internal/message_templates' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/message_templates'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/message_templates'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/message_templates' do
    let(:params) {
      {
        message_template: {
          name: 'demo_name',
          title: 'demo_title',
          content: 'demo_content',
        }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/message_templates', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/message_templates', params: params
        expect(response.status).to eq 401
      end
    end
  end
end
