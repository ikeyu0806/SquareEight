require 'rails_helper'

RSpec.describe 'Api::Internal::MessageTemplatesController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let!(:customer) { create(:customer, account_id: account.id) }
  let(:customer_group) { create(:customer_group, account_id: account.id) }
  let!(:customer_group_relation) { create(:customer_group_relation, customer_id: customer.id, customer_group_id: customer_group.id) }
  let(:message_template) { create(:message_template, account_id: account.id) }

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

  describe 'POST /api/internal/message_templates/:public_id' do
    let(:params) {
      {
        message_template: {
          name: 'update_demo_name',
          title: 'update_demo_title',
          content: 'update_demo_content',
        }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/message_templates/#{message_template.public_id}", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/message_templates/#{message_template.public_id}", params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/message_templates/:public_id/send_mail' do
    context 'login as merchant_user' do
      context 'target_type is Customer' do
        let(:params) {
          {
            message_template: {
              target_type: 'customer',
              payment_request_name: 'demo',
              payment_request_price: 3000,
              target_customers: { "email": customer.email,  "id": customer.id }
            }
          }
        }
        it 'should return 200' do
          allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
          post "/api/internal/message_templates/#{message_template.public_id}/send_mail", params: params
          expect(response.status).to eq 200
        end
      end

      context 'target_type is CustomerGroup' do
        let(:params) {
          {
            message_template: {
              target_type: 'customerGroup',
              payment_request_name: 'demo',
              payment_request_price: 3000,
              target_customer_groups: {"id": customer_group.id},
            }
          }
        }
        it 'should return 200' do
          allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
          post "/api/internal/message_templates/#{message_template.public_id}/send_mail", params: params
          expect(response.status).to eq 200
        end
      end
    end

    context 'not login' do
      let(:params) {
        {
          message_template: {
            target_type: 'Customer',
            target_customers: [customer]
          }
        }
      }
      it 'should return 401' do
        post '/api/internal/message_templates/send_mail', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'DELETE /api/internal/message_templates/:public_id' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        delete "/api/internal/message_templates/#{message_template.public_id}"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        delete "/api/internal/message_templates/#{message_template.public_id}"
        expect(response.status).to eq 401
      end
    end
  end
end
