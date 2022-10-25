require 'rails_helper'

RSpec.describe 'Api::Internal::ReserveFramesController', type: :request do
  let(:account) { create(:business_account) }
  let(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let!(:reserve_frame) { create(:reserve_frame, account: account) }

  describe 'GET /api/internal/reserve_frames' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/reserve_frames'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/reserve_frames'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/reserve_frames' do
    context 'not login' do
      it 'should return 200' do
        get "/api/internal/reserve_frames/#{reserve_frame.public_id}"
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/reserve_frames' do
    let(:params) {
      {
        reserve_frame: {
          title: 'タイトル',
          repeat_interval_type: 'Day',
          repeat_interval_number_day: 1,
          repeat_interval_number_week: 1,
          repeat_interval_number_month: 1,
          repeat_interval_month_date: 1,
          start_at: (Time.zone.now + 1.weeks).strftime("%Y-%m-%d"),
          repeat_end_date: (Time.zone.now + 1.weeks + 1.hours).strftime("%Y-%m-%d"),
          is_every_day_repeat: true,
          is_every_week_repeat: true,
          is_every_month_repeat: true,
          capacity: 5,
          local_payment_price: 1000,
          credit_card_payment_price: 1000,
          publish_status: 'Publish',
          reception_type: 'Immediate',
          reception_start_day_before: 1,
          cancel_reception: 'OnlyOnTheDay',
          cancel_reception_day_before: 1,
          cancel_reception_hour_before: 1,
          is_set_price: true,
          is_local_payment_enable: true,
          is_credit_card_payment_enable: true,
          is_ticket_payment_enable: false,
          is_monthly_plan_payment_enable: false,
          apply_multi_local_payment_price: false,
          multi_local_payment_prices: [{name: '大人', price: 1000}, {name: '子供', price: 500}],
          repeat_wdays: [],
          monthly_payment_plan_ids: [],
          reserve_frame_reception_times: [reception_start_time: '10:00', reception_end_time: '11:00'],
          unreservable_frames: [],
          out_of_range_frames: [],
          reservable_frame_ticket_master: []
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/reserve_frames', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/reserve_frames', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/reserve_frames' do
    let(:params) {
      {
        reserve_frame: {
          title: 'タイトル',
          repeat_interval_type: 'Day',
          repeat_interval_number_day: 1,
          repeat_interval_number_week: 1,
          repeat_interval_number_month: 1,
          repeat_interval_month_date: 1,
          start_at: (Time.zone.now + 1.weeks).strftime("%Y-%m-%d"),
          repeat_end_date: (Time.zone.now + 1.weeks + 1.hours).strftime("%Y-%m-%d"),
          is_every_day_repeat: true,
          is_every_week_repeat: true,
          is_every_month_repeat: true,
          capacity: 5,
          local_payment_price: 1000,
          credit_card_payment_price: 1000,
          publish_status: 'Publish',
          reception_type: 'Immediate',
          reception_start_day_before: 1,
          cancel_reception: 'OnlyOnTheDay',
          cancel_reception_day_before: 1,
          cancel_reception_hour_before: 1,
          is_set_price: true,
          is_local_payment_enable: true,
          is_credit_card_payment_enable: true,
          is_ticket_payment_enable: false,
          is_monthly_plan_payment_enable: false,
          apply_multi_local_payment_price: false,
          multi_local_payment_prices: [{name: '大人', price: 1000}, {name: '子供', price: 500}],
          repeat_wdays: [],
          monthly_payment_plan_ids: [],
          reserve_frame_reception_times: [reception_start_time: '10:00', reception_end_time: '11:00'],
          unreservable_frames: [],
          out_of_range_frames: [],
          reservable_frame_ticket_master: []
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/reserve_frames/#{reserve_frame.public_id}", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/reserve_frames/#{reserve_frame.public_id}", params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/reserve_frames/settable_relation_data' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/reserve_frames/settable_relation_data'
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/reserve_frames/settable_relation_data'
        expect(response.status).to eq 401
      end
    end
  end

  describe 'DELETE /api/internal/reserve_frames/:public_id' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        delete "/api/internal/reserve_frames/#{reserve_frame.public_id}"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        delete "/api/internal/reserve_frames/#{reserve_frame.public_id}"
        expect(response.status).to eq 401
      end
    end
  end
end
