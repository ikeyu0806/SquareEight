require 'rails_helper'

RSpec.describe ReserveFrame, type: :model do
  let(:account) { create(:business_account) }
  let(:reserve_frame) { create(:reserve_frame, account: account) }
  let(:monthly_payment_plan) { create(:monthly_payment_plan, account_id: account.id) }
  let(:ticket_master) { create(:ticket_master, account_id: account.id) }
  let!(:reserve_frame_monthly_payment_plan) { create(:reserve_frame_monthly_payment_plan, reserve_frame_id: reserve_frame.id, monthly_payment_plan_id: monthly_payment_plan.id) }
  let!(:reserve_frame_ticket_master) { create(:reserve_frame_ticket_master, reserve_frame_id: reserve_frame.id, ticket_master_id: ticket_master.id) }
  let!(:unreservable_frame) { create(:unreservable_frame, reserve_frame_id: reserve_frame.id) }
  let!(:out_of_range_frame) { create(:out_of_range_frame, reserve_frame_id: reserve_frame.id) }
  let!(:reserve_frame_reception_time) { create(:reserve_frame_reception_time, reserve_frame_id: reserve_frame.id) }
  # reservation
  let(:reservation_start_at) { Time.new((Time.zone.now + 3.days).year, (Time.zone.now + 3.days).month, (Time.zone.now + 3.days).day, 14) }
  let(:reservation_end_at) { Time.new((Time.zone.now + 3.days).year, (Time.zone.now + 3.days).month, (Time.zone.now + 3.days).day, 15) }
  let!(:local_payment_reservations) {
    create_list(:local_payment_reservation, 3,
                 reserve_frame: reserve_frame,
                 start_at: reservation_start_at,
                 end_at: reservation_end_at)
  }
  let(:first_reservation) { local_payment_reservations.first }

  let(:no_vacant_reservation_start_at) { Time.new((Time.zone.now + 5.days).year, (Time.zone.now + 5.days).month, (Time.zone.now + 5.days).day, 14) }
  let(:no_vacant_reservation_end_at) { Time.new((Time.zone.now + 5.days).year, (Time.zone.now + 5.days).month, (Time.zone.now + 5.days).day, 15) }
  let!(:no_vacant_reservations) {
    create_list(:local_payment_reservation, 5,
                 reserve_frame: reserve_frame,
                 start_at: no_vacant_reservation_start_at,
                 end_at: no_vacant_reservation_end_at)
  }
  let(:first_no_vacant_reservation) { no_vacant_reservations.first }

  describe 'payment_methods' do
    it 'should return expect value' do
      payment_methods = reserve_frame.payment_methods
      expect(payment_methods[:local_payment_price]).to eq 1000
      expect(payment_methods[:credit_card_payment_price]).to eq 1000
      expect(payment_methods[:enable_monthly_payment_plans].pluck(:monthly_payment_plan_name)).to include monthly_payment_plan.name
      expect(payment_methods[:enable_tickets].pluck(:ticket_name)).to include ticket_master.name
    end
  end

  describe 'payment_methods_text' do
    it 'should return expect value' do
      payment_methods_text = reserve_frame.payment_methods_text
      expect(payment_methods_text).to include "現地払い: ¥1000"
      expect(payment_methods_text).to include "クレジットカード払い: ¥1000"
      expect(payment_methods_text).to include "月額サブスクリプション 1週辺り1回予約可能"
      expect(payment_methods_text).to include "100枚発行 消費枚数: 1枚"
    end
  end

  describe 'repeat_setting_text' do
    context 'day repeat' do
      it do
        expect(reserve_frame.repeat_setting_text).to eq '毎日繰り返す'
      end
    end

    context 'week repeat' do
      let(:week_reserve_frame) { create(:reserve_frame, repeat_interval_type: 'Week', account: account) }
      it do
        expect(week_reserve_frame.repeat_setting_text).to eq '毎週繰り返す'
      end
    end

    context 'month repeat' do
      let(:month_reserve_frame) { create(:reserve_frame, repeat_interval_type: 'Month', account: account) }
      it do
        expect(month_reserve_frame.repeat_setting_text).to eq '毎月繰り返す'
      end
    end

    context 'wday repeat' do
      let(:wday_reserve_frame) { create(:reserve_frame, repeat_interval_type: 'WDay', account: account) }
      it do
        expect(wday_reserve_frame.repeat_setting_text).to eq '曜日ごとに繰り返す: 月, 火, 水, 木, 金'
      end
    end
  end

  describe 'reception_type_text' do
    context 'Immediate repeat' do
      let(:immediate_reserve_frame) { create(:reserve_frame, reception_type: 'Immediate', account: account) }
      it do
        expect(immediate_reserve_frame.reception_type_text).to eq '即時予約'
      end
    end

    context 'week repeat' do
      let(:temporary_reserve_frame) { create(:reserve_frame, reception_type: 'Temporary', account: account) }
      it do
        expect(temporary_reserve_frame.reception_type_text).to eq '仮予約'
      end
    end

    context 'month repeat' do
      let(:phone_only_reserve_frame) { create(:reserve_frame, reception_type: 'PhoneOnly', account: account) }
      it do
        expect(phone_only_reserve_frame.reception_type_text).to eq '電話のみ'
      end
    end
  end

  describe 'repeat_month_list' do
    it do
      repeat_month_list = reserve_frame.repeat_month_list
      expect(repeat_month_list).to include(Time.zone.now.strftime("%Y-%m"))
      expect(repeat_month_list).to include((Time.zone.now + (reserve_frame.repeat_interval_number_month + 1).month).strftime("%Y-%m"))
    end
  end

  describe 'unreservable_frames_dates_range' do
    it do
      unreservable_frames_dates_range = reserve_frame.unreservable_frames_dates_range
      expect(unreservable_frames_dates_range).to eq [unreservable_frame.start_at..unreservable_frame.start_at.end_of_day]
    end
  end

  describe 'is_cover_unreservable_frames_dates' do
    context 'today' do
      it do
        expect(reserve_frame.is_cover_unreservable_frames_dates Date.today).to be_truthy
      end
    end

    context 'yesterday' do
      it do
        expect(reserve_frame.is_cover_unreservable_frames_dates Date.yesterday).to be_falsey
      end
    end
  end

  describe 'out_of_range_frames_dates_range' do
    it do
      out_of_range_frames_dates_range = reserve_frame.out_of_range_frames_dates_range
      expect(out_of_range_frames_dates_range).to eq [out_of_range_frame.start_at..out_of_range_frame.start_at.end_of_day]
    end
  end

  describe 'is_cover_unreservable_frames_dates' do
    context 'after 3 days' do
      it do
        expect(reserve_frame.is_cover_out_of_range_frames_dates(Date.today + 3.days)).to be_truthy
      end
    end

    context 'today' do
      it do
        expect(reserve_frame.is_cover_out_of_range_frames_dates Date.today).to be_falsey
      end
    end
  end

  describe 'remaining_capacity_count_within_range' do
    it do
      expect(reserve_frame.remaining_capacity_count_within_range(first_reservation.start_at, first_reservation.end_at)).to eq 2
    end
  end

  describe 'reservable_status_with_date' do
    context 'reserveFrame capacity is 5' do
      context '3 reservations' do
        it do
          json = reserve_frame.reservable_status_with_date(first_reservation.start_at)
          expect(json[:status]).to eq 'enable'
          expect(json[:text]).to eq '予約可能'
          expect(json[:reservable]).to eq true
        end
      end

      context '5 reservations' do
        it do
          json = reserve_frame.reservable_status_with_date(first_no_vacant_reservation.start_at)
          expect(json[:status]).to eq 'disable'
          expect(json[:text]).to eq '予約不可'
          expect(json[:reservable]).to eq false
        end
      end
    end
  end

  describe 'calendar_json' do
    context 'this month' do
      let(:three_days_after_date) { (Time.zone.now + 3.days).strftime("%Y-%m-%d") }
      let(:five_days_after_date) { (Time.zone.now + 5.days).strftime("%Y-%m-%d") }
      let(:calendar_json) { reserve_frame.calendar_json(Time.zone.now.year, Time.zone.now.month) }
      it 'should return expected title' do
        expect(calendar_json.find{|json| json[:start] == three_days_after_date }[:title]).to eq "予約可能"
        expect(calendar_json.find{|json| json[:start] == five_days_after_date }[:title]).to eq "予約不可"
        expect(calendar_json.pluck(:title).first(reserve_frame.reception_start_day_before)).not_to include(nil)
        expect(calendar_json.pluck(:title).last(calendar_json.count - reserve_frame.reception_start_day_before)).not_to include("予約可能", "予約不可")
      end
    end
  end

  describe 'validate_reservation' do
    context 'enable reservation' do
      it do
        result = reserve_frame.validate_reservation(first_reservation)
        expect(result[:status]).to eq 'ok'
        expect(result[:error_message]).to eq nil
      end
    end

    context 'disable reservation' do
      it do
        result = reserve_frame.validate_reservation(first_no_vacant_reservation)
        expect(result[:status]).to eq 'ng'
        expect(result[:error_message].to_s).to eq '予約可能不可日です'
      end
    end
  end

  describe 'reception_deadline_text' do
    context 'OnlyOnTheDay' do
      it do
        expect(reserve_frame.reception_deadline_text).to eq '当日の1時間前まで受付'
      end
    end

    context 'PossibleBeforeTheDay' do
      let(:reserve_frame) { create(:reserve_frame, :cancel_possible_before_the_day, account: account) }
      it do
        expect(reserve_frame.reception_deadline_text).to eq '1日前まで受付'
      end
    end
  end
end
