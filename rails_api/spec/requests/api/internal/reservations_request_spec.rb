require 'rails_helper'

RSpec.describe 'Api::Internal::ReservationsController', type: :request do
  let(:account) { create(:business_account) }
  let!(:merchant_user) {
    create(:merchant_user, account: account)
  }
  let(:customer) { create(:customer, account_id: account.id) }
  let(:reserve_frame) { create(:reserve_frame, account: account) }
  let!(:reserve_frame_reception_time) { create(:reserve_frame_reception_time, reserve_frame_id: reserve_frame.id) }
  let(:local_payment_reservation) { create(:local_payment_reservation, reserve_frame: reserve_frame, customer_id: customer.id) }

  describe 'POST /api/internal/reservations/insert_time_payment_method' do
    let(:params) {
      {
        reservations: {
          reservation_date: (Time.zone.now + 1.weeks).strftime("%Y-%m-%d"),
          time: (Time.zone.now + 1.weeks).strftime("%H:%M") + "-" + (Time.zone.now + 1.weeks + 1.hours).strftime("%H:%M"),
          reserve_frame_public_id: reserve_frame.public_id,
          reserve_count: 1,
          price: 1000,
          payment_method: 'localPayment',

        }
      }
    }
    context 'not login' do
      it 'should return 200' do
        post '/api/internal/reservations/insert_time_payment_method', params: params
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/reservations/:public_id/confirm' do
    let(:params) {
      {
        reservations: {
          public_id: local_payment_reservation.public_id,
          last_name: 'test',
          first_name: 'taro',
          email: 'test@example.com',
          phone_number: '09011112222'
        }
      }
    }
    context 'not login' do
      it 'should return 200' do
        post "/api/internal/reservations/#{local_payment_reservation.public_id}/confirm", params: params
        expect(response.status).to eq 200
      end
    end
  end

  describe 'GET /api/internal/reservations/:public_id' do
    context 'not login' do
      it 'should return 200' do
        get "/api/internal/reservations/#{local_payment_reservation.public_id}"
        expect(response.status).to eq 200
      end
    end
  end

  describe 'POST /api/internal/reservations/:public_id/update_status' do
    let(:params) {
      {
        reservations: {
          status: 'confirm'
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post "/api/internal/reservations/#{local_payment_reservation.public_id}/update_status", params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post "/api/internal/reservations/#{local_payment_reservation.public_id}/update_status", params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /api/internal/reservations/register_by_merchant_control' do
    let(:params) {
      {
        reservations: {
          reservation_date: (Time.zone.now + 1.weeks).strftime("%Y-%m-%d"),
          start_time: (Time.zone.now + 1.weeks).strftime("%H:%M"),
          end_time: (Time.zone.now + 1.weeks + 1.hours).strftime("%H:%M"),
          is_select_customer: true,
          customer_public_id: customer.public_id,
          last_name: 'test',
          first_name: 'taro',
          email: 'test@example.com',
          phone_number: '09011112222',
          number_of_people: 1,
          price: 1000,
          reserve_frame_public_id: reserve_frame.public_id
        }
      }
    }
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        post '/api/internal/reservations/register_by_merchant_control', params: params
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        post '/api/internal/reservations/register_by_merchant_control', params: params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'GET /api/internal/reservations/register_reservation_info' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        get '/api/internal/reservations/register_reservation_info?reservation_public_id=' + local_payment_reservation.public_id
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        get '/api/internal/reservations/register_reservation_info?reservation_public_id=' + local_payment_reservation.public_id
        expect(response.status).to eq 401
      end
    end
  end

  describe 'DELETE /api/internal/reservations/:public_id' do
    context 'login as merchant_user' do
      it 'should return 200' do
        allow_any_instance_of(ApplicationController).to receive(:current_merchant_user).and_return(merchant_user)
        delete "/api/internal/reservations/#{local_payment_reservation.public_id}?send_mail=0"
        expect(response.status).to eq 200
      end
    end

    context 'not login' do
      it 'should return 401' do
        delete "/api/internal/reservations/#{local_payment_reservation.public_id}?send_mail=0"
        expect(response.status).to eq 401
      end
    end
  end
end
