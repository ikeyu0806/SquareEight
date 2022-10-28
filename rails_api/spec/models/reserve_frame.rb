require 'rails_helper'

RSpec.describe ReserveFrame, type: :model do
  let(:account) { create(:business_account) }
  let(:reserve_frame) { create(:reserve_frame, account: account) }
  let(:monthly_payment_plan) { create(:monthly_payment_plan, account_id: account.id) }
  let(:ticket_master) { create(:ticket_master, account_id: account.id) }
  let!(:reserve_frame_monthly_payment_plan) { create(:reserve_frame_monthly_payment_plan, reserve_frame_id: reserve_frame.id, monthly_payment_plan_id: monthly_payment_plan.id) }
  let!(:reserve_frame_ticket_master) { create(:reserve_frame_ticket_master, reserve_frame_id: reserve_frame.id, ticket_master_id: ticket_master.id) }

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
      expect(payment_methods_text).to include "月額課金 1週辺り1回予約可能"
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
end
