require 'rails_helper'

RSpec.describe 'Api::Internal::DeliveryDatetimeSettingsController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }

  describe 'GET /api/internal/delivery_datetime_settings' do
    let!(:delivery_datetime_setting) { create(:delivery_datetime_setting, account: account) }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/delivery_datetime_settings'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/delivery_datetime_settings'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/delivery_datetime_settings/register' do
    let(:demoa_product) { create(:product, account: account) }
    let(:demob_product) { create(:product, account: account) }
    
    let(:params) {
      {
        delivery_datetime_setting: {
          shortest_delivery_day: 1,
          longest_delivery_day: 10,
          deadline_time: "19:00",
          is_set_per_area_delivery_date: false,
          is_holiday_sun: true,
          is_holiday_mon: false,
          is_holiday_tue: false,
          is_holiday_wed: false,
          is_holiday_thu: false,
          is_holiday_fri: false,
          is_holiday_sat: true,
          delivery_time_type: "yamato",
          products: [
            {
              id: demoa_product.id,
              name: demoa_product.name,
              delivery_datetime_target_flg: true
            },
            {
              id: demob_product.id,
              name: demob_product.name,
              delivery_datetime_target_flg: true
            }
          ],
          delivery_datetime_temporary_holidays: [
            "2000-01-01"
          ],
          custom_delivery_times: [],
          additional_delivery_days_per_region: [
            {
              region: "北海道",
              additional_delivery_days: 0
            }
          ]
        }
      }
    }

    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/delivery_datetime_settings/register', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/delivery_datetime_settings/register', params: params
        expect(response.status).to eq 401
      end
    end
  end

end
