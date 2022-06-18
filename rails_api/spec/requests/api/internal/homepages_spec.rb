require 'rails_helper'

RSpec.describe 'Api::Internal::HomepagesController', type: :request do
  let(:account) { create(:business_account) }
  let!(:fitness_website) { create(:fitness_website, account: account) }
  let!(:merchant_user) {
    create(:business_user,
            account: account,
            verification_code: "123456",
            verification_code_expired_at: Time.zone.now + 1.days)
  }

  describe 'GET /api/internal/homepages' do
    context 'login' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get api_internal_homepages_path
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/homepages' do
    let(:params) {
      {
        homepage: {
          website_tag: 'testサイト'
       }
      }
    }
    context 'login' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post api_internal_homepages_path(params: params)
        expect(response.status).to eq 200
      end
    end
  end

  describe 'GET /api/internal/homepages/webpages' do
    context 'login' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get api_internal_homepages_webpages_path(website_id: fitness_website.id)
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/homepages/update_tag' do
    let(:params) {
      {
        homepage: {
          website_id: fitness_website.id,
          tag: 'testサイト更新'
       }
      }
    }
    context 'login' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post api_internal_homepages_update_tag_path(params: params)
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/homepages/publish' do
    let(:params) {
      {
        homepage: {
          website_id: fitness_website.id
       }
      }
    }
    context 'login' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post api_internal_homepages_publish_path(params: params)
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/homepages/unpublish' do
    let(:params) {
      {
        homepage: {
          website_id: fitness_website.id
       }
      }
    }
    context 'login' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post api_internal_homepages_unpublish_path(params: params)
        expect(response.status).to eq 200
      end
    end
  end
end
