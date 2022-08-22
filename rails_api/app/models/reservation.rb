class Reservation < ApplicationRecord
  belongs_to :reserve_frame

  enum payment_method: { localPayment: 0, creditCardPayment: 1, ticket: 2, monthlyPaymentPlan: 3 }
  enum status: { pendingVerifivation: 0, confirm: 1 }

  def reserve_frame_title
    reserve_frame.title
  end

  def display_reservation_datetime
    start_at.strftime("%Y年%m月 %H時%M分~") + end_at.strftime("%H時%M分")
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
    ticket_master = TicketMaster.find(self.ticket_master_id)
    ticket_master&.name
  end

  def monthly_payment_plan_name
    monthly_payment_plan = MonthlyPaymentPlan.find(self.monthly_payment_plan_id)
    monthly_payment_plan&.name
  end
end
