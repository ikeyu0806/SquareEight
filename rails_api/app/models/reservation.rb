require 'securerandom'

class Reservation < ApplicationRecord
  belongs_to :reserve_frame
  belongs_to :customer

  enum payment_method: { localPayment: 0, creditCardPayment: 1, ticket: 2, monthlyPaymentPlan: 3 }
  enum status: { pendingVerifivation: 0, confirm: 1 }

  before_create :insert_viewable_key

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
    case payment_method
    when 'pendingVerifivation'
      return '仮予約'
    when 'confirm'
      return '確定'
    else
      return ''
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
    customer.full_name
  end

  def customer_email
    customer.email
  end

  def customer_phone_number
    customer.phone_number
  end

  def reception_type
    reserve_frame.reception_type
  end

  def insert_viewable_key
    self.viewable_key = SecureRandom.alphanumeric
  end
end
