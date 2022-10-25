require 'rails_helper'

RSpec.describe 'Api::Internal::webpagesRequestController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }

  let(:webpage) { create(:webpage, account: account) }

  describe 'GET /api/internal/webpages' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/webpages'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/webpages'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/webpages/:public_id' do
    context 'not login' do
      it 'should return 200' do
        get "/api/internal/webpages/#{webpage.public_id}"
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/webpages' do
    let(:params) {
      {
        webpage: {
          tag: 'update demo',
          page_content: {
            "blockContent": [
              {
                "blockID": "1840e4417a1",
                "sortOrder": 1,
                "atoms": [
                  {
                    "atomType": "heading",
                    "text": "見出し",
                    "placement": "left",
                    "size": 1
                  }
                ]
              }
            ]
          }
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/webpages', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/webpages', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/webpages/update' do
    let(:params) {
      {
        webpage: {
          tag: 'demo',
          page_content: {
            "blockContent": [
              {
                "blockID": "1840e4417a1",
                "sortOrder": 1,
                "atoms": [
                  {
                    "atomType": "heading",
                    "text": "見出し",
                    "placement": "left",
                    "size": 1
                  }
                ]
              }
            ]
          }
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/webpages/update?public_id=#{webpage.public_id}", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/webpages/update?public_id=#{webpage.public_id}", params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'DELETE /api/internal/webpages/:public_id' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        delete "/api/internal/webpages/#{webpage.public_id}"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        delete "/api/internal/webpages/#{webpage.public_id}"
        expect(response.status).to eq 401
      end
    end
  end
end
