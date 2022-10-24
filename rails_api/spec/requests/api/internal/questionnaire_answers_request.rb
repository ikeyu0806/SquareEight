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
end
