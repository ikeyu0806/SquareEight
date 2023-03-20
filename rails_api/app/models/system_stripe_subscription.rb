class SystemStripeSubscription < ApplicationRecord
  include PublicIdModule

  belongs_to :account

  enum service_plan: { Free: 0, Light: 1, Standard: 2, Premium: 3 }

  # 請求する日を引数に取って前回の請求日からの日割りで請求金額を算出する
  # 最終支払い日付から現在の日付までを計算
  # 請求日が29~31日の場合は前月の月末日から今月の月末日を確認。
  def prorated_plan_price
    plan_price = account.plan_price
    # 請求日と今日の日にちが一致。もしくは請求日が月末で今日も月末なら満額請求
    if require_full_bill
      prorated_price = plan_price
    # それ以外なら前回の請求日から今月までの差分で割る
    else
      prorated_price = plan_price / last_billing_to_today_days
    end
    prorated_price
  end

  # 満額請求か判定
  def require_full_bill
    current_date = Time.zone.now
    current_day = current_date.day
    billing_cycle_anchor_day = billing_cycle_anchor_datetime.day
    # 請求日と今日が同じ日にちならtrue
    return true if current_day.eql?(billing_cycle_anchor_day)
    # 今日が月末で先月末の日にちより小さければtrueを返す
    last_month_date = Time.zone.now - 1.months
    last_month_day = last_month_date.day
    last_month_end_date = last_month_date.end_of_month
    last_month_end_day = last_month_end_date.day
    current_end_of_date = current_date.end_of_day
    current_end_of_month_date = current_date.end_of_month
    current_end_of_month_day = current_end_of_month_date.day
    if current_end_of_date == current_end_of_month_date
      return true if current_end_of_month_day < last_month_end_day
    end
    # それ以外はfalse
    return false
  end

  def last_billing_to_today_days
    current_date = Time.zone.now
    # 支払いが一度もなければ加入日起点
    paid_date = last_paid_at.blank? ? created_at : last_paid_at
    days = (current_date - paid_date).to_i
    days
  end
end
