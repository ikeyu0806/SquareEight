require 'rails_helper'

RSpec.describe Reservation, type: :model do
  let(:account) { create(:business_account) }
  let(:reserve_frame) { create(:reserve_frame, account: account) }
  # 日時起点
  let(:this_day) { Time.zone.now }

  # 先週
  let(:before_one_week_monday) {  ((this_day - 1.weeks).to_date - (this_day.wday - 1)).beginning_of_day }
  let(:before_one_week_tuesday) {  ((this_day - 1.weeks).to_date - (this_day.wday - 2)).beginning_of_day }
  let(:before_one_week_wednesday) {  ((this_day - 1.weeks).to_date - (this_day.wday - 3)).beginning_of_day }
  let(:before_one_week_thursday) {  ((this_day - 1.weeks).to_date - (this_day.wday - 4)).beginning_of_day }
  let(:before_one_week_friday) {  ((this_day - 1.weeks).to_date - (this_day.wday - 5)).beginning_of_day }
  let(:before_one_week_saturday) {  ((this_day - 1.weeks).to_date - (this_day.wday - 6)).beginning_of_day }
  let(:before_one_week_sunday) {  ((this_day - 1.weeks).to_date - (this_day.wday - 0)).beginning_of_day }

  # 今週
  let(:this_monday) {  (this_day.to_date - (this_day.wday - 1)).beginning_of_day }
  let(:this_tuesday) {  (this_day.to_date - (this_day.wday - 2)).beginning_of_day }
  let(:this_wednesday) {  (this_day.to_date - (this_day.wday - 3)).beginning_of_day }
  let(:this_thursday) {  (this_day.to_date - (this_day.wday - 4)).beginning_of_day }
  let(:this_friday) {  (this_day.to_date - (this_day.wday - 5)).beginning_of_day }
  let(:this_saturday) {  (this_day.to_date - (this_day.wday - 6)).beginning_of_day }
  let(:this_sunday) {  (this_day.to_date - (this_day.wday - 0)).beginning_of_day }

  # 来週
  let(:after_one_week_monday) {  ((this_day + 1.weeks).to_date - (this_day.wday - 1)).beginning_of_day }
  let(:after_one_week_tuesday) {  ((this_day + 1.weeks).to_date - (this_day.wday - 2)).beginning_of_day }
  let(:after_one_week_wednesday) {  ((this_day + 1.weeks).to_date - (this_day.wday - 3)).beginning_of_day }
  let(:after_one_week_thursday) {  ((this_day + 1.weeks).to_date - (this_day.wday - 4)).beginning_of_day }
  let(:after_one_week_friday) {  ((this_day + 1.weeks).to_date - (this_day.wday - 5)).beginning_of_day }
  let(:after_one_week_saturday) {  ((this_day + 1.weeks).to_date - (this_day.wday - 6)).beginning_of_day }
  let(:after_one_week_sunday) {  ((this_day + 1.weeks).to_date - (this_day.wday - 0)).beginning_of_day }

  # 指定範囲内の予約をselectするクエリメソッドのテスト
  # 支払いに使われる月額サブスクリプションの予約可能範囲内の予約をselectする
  describe 'subscription_validate_scope' do
    describe 'reserve_interval_unit is Day' do
      describe 'reserve with three_times_every_two_week_reservable_plan' do
        let(:three_times_every_two_week_reservable_plan) { create(:three_times_every_two_week_reservable_plan, account_id: account.id) }
        let!(:reserve_frame_monthly_payment_plan) { create(:reserve_frame_monthly_payment_plan, reserve_frame_id: reserve_frame.id, monthly_payment_plan_id: three_times_every_two_week_reservable_plan.id) }
        describe 'two reservation for this weeks exists' do
          let(:this_monday_reservation_start_at) { this_monday + 14.hours}
          let(:this_monday_reservation_end_at) { this_monday + 15.hours }
          let(:this_tuesday_reservation_start_at) { this_tuesday + 14.hours }
          let(:this_tuesday_reservation_end_at) { this_tuesday + 15.hours }
          let!(:this_monday_reservation) {
            create(:monthly_payment_reservation,
                    reserve_frame: reserve_frame,
                    start_at: this_monday_reservation_start_at,
                    end_at: this_monday_reservation_end_at,
                    monthly_payment_plan_id: three_times_every_two_week_reservable_plan.id)
          }
          let!(:this_tuesday_reservation) {
            create(:monthly_payment_reservation,
                    reserve_frame: reserve_frame,
                    start_at: this_tuesday_reservation_start_at,
                    end_at: this_tuesday_reservation_end_at,
                    monthly_payment_plan_id: three_times_every_two_week_reservable_plan.id)
          }
          it 'should return expect value' do
            expect(Reservation.subscription_validate_scope(this_wednesday, 1, 'front', 'Week', three_times_every_two_week_reservable_plan.id).count).to eq 2
          end
        end
      end
    end
  end
end
