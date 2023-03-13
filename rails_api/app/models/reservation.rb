require 'securerandom'

class Reservation < ApplicationRecord
  include PublicIdModule

  # 未読予約有りステータスに更新
  before_save :update_read_reservations_status_unread

  belongs_to :reserve_frame
  has_one :account, through: :reserve_frame
  has_one :end_user, foreign_key: :id, primary_key: :end_user_id
  has_one :ticket_master, foreign_key: :id, primary_key: :ticket_master_id
  has_one :customer, foreign_key: :id, primary_key: :customer_id
  has_one :monthly_payment_plan, foreign_key: :id, primary_key: :monthly_payment_plan_id
  has_many :reservation_local_payment_prices
  has_many :reservation_credit_card_payment_prices
  has_many :reservation_purchased_ticket_relations
  has_many :purchased_tickets, through: :reservation_purchased_ticket_relations

  enum payment_method: { localPayment: 0, creditCardPayment: 1, ticket: 2, monthlyPaymentPlan: 3 }
  enum status: { pendingVerifivation: 0,
                 confirm: 1,
                 inputTimeWithPaymentMethod: 2,
                 cancel: 3,
                 waitingForLotteryConfirm: 4,
                 lostLottery: 5 }

  scope :subscription_validate_target_status, -> {
    where(status: ['confirm', 'waitingForLotteryConfirm'])
  }

  # 指定範囲内の予約selectするクエリメソッド。複雑なscopeみたいな感じ
  # 支払いに使われる月額サブスクリプションの予約可能範囲内の予約をselectする
  def self.monthly_subscription_range_reservations(this_day, judgment_range=nil, monthly_payment_plan_id)
    # 曜日判定: this_day = Time.zone.now
    # 日曜日: this_day.to_date - (this_day.wday - 0)
    # 土曜日: this_day.to_date - (this_day.wday - 6)
    monthly_payment_plan = MonthlyPaymentPlan.find(monthly_payment_plan_id)
    front_and_back_num = monthly_payment_plan.reserve_interval_number - 1
    range_start_sunday = (this_day.to_date - (this_day.wday - 0)).beginning_of_day
    range_end_saturday = (this_day.to_date - (this_day.wday - 6)).end_of_day
    if monthly_payment_plan.reserve_interval_unit == 'Day'
      case judgment_range
      # front_and_back_num日前から今週まで判定
      when 'front'
        where(start_at: (this_day - front_and_back_num.days)..(this_day.end_of_day)).subscription_validate_target_status.where(monthly_payment_plan_id: monthly_payment_plan_id)
      # 今週からfront_and_back_num日後まで判定
      when 'back'
        where(start_at: (this_day)..(this_day.end_of_day + front_and_back_num.days)).subscription_validate_target_status.where(monthly_payment_plan_id: monthly_payment_plan_id)
      else
        where(start_at: range_start_sunday..range_end_saturday).subscription_validate_target_status.where(monthly_payment_plan_id: monthly_payment_plan_id)
      end
    elsif monthly_payment_plan.reserve_interval_unit == 'Week'
      case judgment_range
      # front_and_back_num週間前から今週まで判定
      when 'front'
        where(start_at: (this_day - front_and_back_num.week)..(this_day.end_of_day)).subscription_validate_target_status.where(monthly_payment_plan_id: monthly_payment_plan_id)
      # 今週からfront_and_back_num週間後まで判定
      when 'back'
        where(start_at: (this_day)..(this_day.end_of_day + front_and_back_num.week)).subscription_validate_target_status.where(monthly_payment_plan_id: monthly_payment_plan_id)
      else
        where(start_at: range_start_sunday..range_end_saturday).subscription_validate_target_status.where(monthly_payment_plan_id: monthly_payment_plan_id)
      end
    end
  end

  def update_read_reservations_status_unread
    if self.confirm? && self.status_changed?
      self.account.merchant_users.each do |user|
        user.read_reservations_status_UnreadExist!
      end
    end
  end

  def reserve_frame_title
    reserve_frame.title
  end

  def lottery_confirmed_day_before
    reserve_frame.lottery_confirmed_day_before
  end

  def lottery_confirmed_day_before_text
    (self.start_at - reserve_frame.lottery_confirmed_day_before.days).strftime("%Y年%m月%d日")
  end

  def lottery_confirmed_day_before_datetime
    self.start_at - reserve_frame.lottery_confirmed_day_before.days
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
      return '回数券支払い' + self.ticket_master_name + ' 消費枚数:' + ticket_consume_number.to_s + '枚'
    when 'monthlyPaymentPlan'
      return '月額サブスクリプション ' + self.monthly_payment_plan_name
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

  def ticket_consume_number
    reservation_purchased_ticket_relations.pluck(:consume_number).inject{ |consume_cumber, item| consume_cumber + item }
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

  def exec_payment
    # 支払い実行
    # StripeへのリクエストはActiveRecordのTransactionで取り消せないので最後に実行
    reserve_frame = self.reserve_frame
    if reserve_frame.is_set_price?
      raise 'エンドユーザが存在しません' if end_user.blank?
      case self.payment_method
      when 'creditCardPayment'
        # 決済
        Stripe.api_key = Rails.configuration.stripe[:secret_key]
        Stripe.api_version = '2022-08-01'
        stripe_customer = Stripe::Customer.retrieve(end_user.stripe_customer_id)
        default_payment_method_id = stripe_customer["invoice_settings"]["default_payment_method"]
        if self.reservation_credit_card_payment_prices.present?
          amount = self.reservation_credit_card_payment_prices.pluck(:price).inject {|result, item| result + item }
        else
          amount = self.price
        end
        commission = (self.price * 0.04).to_i
        payment_intent = Stripe::PaymentIntent.create({
          amount: amount,
          currency: 'jpy',
          payment_method_types: ['card'],
          payment_method: default_payment_method_id,
          customer: end_user.stripe_customer_id,
          application_fee_amount: commission,
          metadata: {
            'order_date': current_date_text,
            'account_business_name': reserve_frame.account.business_name,
            'purchase_product_name': reserve_frame.title,
            'price': self.price,
            'type': 'reservation',
            'reserve_frame_id': reserve_frame.id
          },
          transfer_data: {
            destination: reserve_frame.account.stripe_account_id
          }
        })
        Stripe::PaymentIntent.confirm(
          payment_intent.id
        )
        self.update!(stripe_payment_intent_id: payment_intent.id)
        # 注文データ作成
        order = end_user.orders.new
        order.order_items.new(item_type: 'Reservation',
                              account_id: reserve_frame.account.id,
                              reservation_id: self.id,
                              product_name: reserve_frame.title,
                              price: self.price,
                              commission: commission)
        order.save!
      when 'ticket'
        end_user_purchased_tickets = end_user
          .purchased_tickets
          .where(ticket_master_id: ticket_master.id)
          .expired
          .order(:expired_at)

        consume_number = reserve_frame.reserve_frame_ticket_masters.find_by(ticket_master_id: self.ticket_master_id).consume_number
        total_remain_number = end_user_purchased_tickets.sum(:remain_number)
        raise 'チケットが足りません' if total_remain_number < consume_number
        consume_number.times do |count|
          purchased_ticket = end_user_purchased_tickets.where("remain_number > ?", 0).first
          purchased_ticket.update!(remain_number: purchased_ticket.remain_number - 1)
          self.reservation_purchased_ticket_relations.create!(purchased_ticket_id: purchased_ticket.id, consume_number: 1)
        end
      when 'monthlyPaymentPlan'
        is_subscribe_plan = end_user.search_stripe_subscriptions.pluck("metadata")&.pluck("monthly_payment_plan_id")
        raise 'プランに加入していません' unless is_subscribe_plan
      else
      end
    end
  end

  def refund_payment
    # 支払いの払い戻し
    reserve_frame = self.reserve_frame
    if reserve_frame.is_set_price?
      case self.payment_method
      when 'creditCardPayment'
        raise 'エンドユーザが存在しません' if end_user.blank?
        # 決済
        Stripe.api_key = Rails.configuration.stripe[:secret_key]
        Stripe.api_version = '2022-08-01'
        Stripe::Refund.create({payment_intent: self.stripe_payment_intent_id})
      when 'ticket'
        self.reservation_purchased_ticket_relations.update_all(consume_number: 0)
      else
      end
    end
  end

  def ticket_master_public_id
    ticket_master&.public_id
  end

  def monthly_payment_plan_public_id
    monthly_payment_plan&.public_id
  end
end
