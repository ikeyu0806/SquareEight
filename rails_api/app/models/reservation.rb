require 'securerandom'

class Reservation < ApplicationRecord
  include PublicIdModule

  belongs_to :reserve_frame
  has_one :customer, foreign_key: :id, primary_key: :customer_id
  has_one :monthly_payment_plan, foreign_key: :id, primary_key: :monthly_payment_plan_id
  has_many :reservation_local_payment_prices
  has_many :reservation_credit_card_payment_prices

  enum payment_method: { localPayment: 0, creditCardPayment: 1, ticket: 2, monthlyPaymentPlan: 3 }
  enum status: { pendingVerifivation: 0, confirm: 1, inputTimeWithPaymentMethod: 2, cancel: 3 }

  def reserve_frame_title
    reserve_frame.title
  end

  def display_reservation_datetime
    start_at.strftime("%Y年%m月%d日 %H時%M分~") + end_at.strftime("%H時%M分")
  end

  def display_payment_method
    case payment_method
    when 'localPayment'
      return '現地払い'
    when 'creditCardPayment'
      return 'クレジットカード支払い'
    when 'ticket'
      return '回数券支払い'
    when 'monthlyPaymentPlan'
      return '月額課金'
    else
      return ''
    end
  end

  def display_status
    case status
    when 'pendingVerifivation'
      return '仮予約'
    when 'confirm'
      return '確定'
    else
      return ''
    end
  end

  def display_price
    if (['localPayment', 'creditCardPayment'].include?(self.payment_method))
      return self.price
    else
      return nil
    end
  end

  def ticket_master_name
    ticket_master = TicketMaster.find(self.ticket_master_id) if self.ticket_master_id.present? && !self.ticket_master_id.zero?
    ticket_master&.name
  end

  def monthly_payment_plan_name
    monthly_payment_plan = MonthlyPaymentPlan.find(self.monthly_payment_plan_id) if self.monthly_payment_plan_id.present? && !self.monthly_payment_plan_id.zero?
    monthly_payment_plan&.name
  end

  def customer_name
    return '顧客が登録されていません' if customer.blank?
    customer.full_name
  end

  def customer_email
    return '顧客が登録されていません' if customer.blank?
    customer.email
  end

  def customer_phone_number
    return '顧客が登録されていません' if customer.blank?
    customer.phone_number
  end

  def reception_type
    reserve_frame.reception_type
  end

  def local_payment_prices_total_price
    total_price = reservation_local_payment_prices.pluck(:price).inject {|result, item| result + item }
  end

  def credit_card_payment_prices_total_price
    total_price = reservation_credit_card_payment_prices.pluck(:price).inject {|result, item| result + item }
  end

  def display_multi_payment_method_with_number_of_people
    text_array = []
    total_price = 0
    if self.payment_method == 'localPayment'
      reservation_local_payment_prices.each do |payment_method|
        text_array.push(payment_method.name + ': ' + payment_method.reserve_number_of_people.to_s + '人')
      end
      total_price = local_payment_prices_total_price
    end
    if self.payment_method == 'creditCardPayment'
      reservation_credit_card_payment_prices.each do |payment_method|
        text_array.push(payment_method.name + ': ' + payment_method.reserve_number_of_people.to_s + '人')
      end
      total_price = reservation_credit_card_payment_prices.pluck(:price).inject {|result, item| result + item }
    end
    return text_array.join(' '), total_price
  end

  def is_cancelable
    return false unless status === 'confirm'
    if reserve_frame.is_accept_cancel
      # 当日キャンセル可能か
      if reserve_frame.is_accept_cancel_on_the_day
        if Time.zone.now >= start_at - reserve_frame.cancel_reception_day_before.hours
          return false
        else
          return true
        end
      else
        if Time.zone.now.to_date >= start_at - reserve_frame.cancel_reception_day_before.days
          return false
        else
          return true
        end
      end
    else
      return false
    end
  end

  def cancel_reception_text
    reserve_frame.cancel_reception_text
  end

  def questionnaire_master_id
    reserve_frame.questionnaire_master_id
  end
end
