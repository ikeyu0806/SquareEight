require 'rails_helper'

RSpec.describe 'Api::Internal::QuestionnaireMastersController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:customer) { create(:customer, account_id: account.id) }
  let!(:questionnaire_master) { create(:questionnaire_master, account: account) }

  describe 'GET /api/internal/questionnaire_masters' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/questionnaire_masters'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/questionnaire_masters'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/questionnaire_masters' do
    let(:params) {
      {
        questionnaire_master: {
          title: 'title',
          description: 'description',
          publish_status: 'Publish',
          question_form_json: [ question: 'いつ',
                                formType: 'date',
                                textFormRowCount: 1,
                                sortOrder: 1,
                                questionId: '183f999960f']
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/questionnaire_masters', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/questionnaire_masters', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/questionnaire_masters/:public_id/update' do
    let(:params) {
      {
        questionnaire_master: {
          title: 'title update',
          description: 'description update',
          publish_status: 'Publish',
          question_form_json: [ question: 'いつ',
                                formType: 'date',
                                textFormRowCount: 1,
                                sortOrder: 1,
                                questionId: '183f999960f']
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/questionnaire_masters/#{questionnaire_master.public_id}/update", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/questionnaire_masters/#{questionnaire_master.public_id}/update", params: params
        expect(response.status).to eq 401
      end
    end
  end
end
