require 'rails_helper'

RSpec.describe 'Api::Internal::QuestionnaireAnswersController', type: :request do
  let(:account) { create(:business_account) }
  let(:customer) { create(:customer, account_id: account.id) }
  let(:questionnaire_master) { create(:questionnaire_master, account: account) }
  let(:questionnaire_answer) { create(:questionnaire_answer,
                                       customer: customer,
                                       questionnaire_master: questionnaire_master) }

  describe 'GET /api/internal/purchased_tickets/:public_id' do
    context 'not login' do
      it 'should return 200' do
        get "/api/internal/questionnaire_answers/#{questionnaire_answer.public_id}"
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/questionnaire_answers/:public_id' do
    let(:params) {
      {
        questionnaire_answer: {
          email: 'test@example.com',
          phone_number: '12312341234',
          last_name: 'demo_last_name',
          first_name: 'demo_first_name',
          answer: [question: '感想', answer: 'とても良い']
        }
      }
    }
    context 'not login' do
      it 'should return 200' do
        post "/api/internal/questionnaire_answers/#{questionnaire_master.public_id}", params: params
        expect(response.status).to eq 200
      end
    end
  end
end
