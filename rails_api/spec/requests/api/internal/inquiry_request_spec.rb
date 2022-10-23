require 'rails_helper'

RSpec.describe 'Api::Internal::InquiryController', type: :request do
  describe 'POST /api/internal/inquiry' do
    let(:params) {
      {
        inquiry: {
          email: 'test@example.com',
          content: 'demo'
       }
      }
    }

    context 'without login' do
      it 'should return 200' do
        post '/api/internal/inquiry', params: params
        expect(response.status).to eq 200
      end
    end
  end
end
