class SystemStripeSubscription < ApplicationRecord
  include PublicIdModule

  belongs_to :account

  enum service_plan: { Free: 0, Light: 1, Standard: 2, Premium: 3 }

  # 請求する日を引数に取って前回の請求日からの日割りで請求金額を算出する
  # 最終支払い日付から現在の日付までを計算
  # 請求日が29~31日の場合は前月の月末日から今月の月末日を確認。
  def prorated_plan_price
    # 現在時刻
    current_date = Time.zone.now
    # 先月
    last_month_date = Time.zone.now - 1.months
    # 先月の最終日
    last_month_end_date = last_month_date.end_of_month
    # 先月の最終日の日を数値で取得。28~31が出てくる
    last_month_end_day = last_month_end_date.day
    # 請求日を数値で取得。1~31が出てくる
    billing_cycle_anchor_day = billing_cycle_anchor_datetime.day
    # 先月の請求日取得
    # 例: 請求日が31日で先月が30日までしかなければ30日が請求日
    if (billing_cycle_anchor_day > 27) && (billing_cycle_anchor_day >= last_month_end_day)
      last_month_billing_end_day = last_month_end_day
    else
      last_month_billing_end_day = billing_cycle_anchor_day
    end
    # 支払いが一度もなければ加入日起点
    last_month_paid_date = last_paid_at.blank? ? created_at : last_paid_at
    last_month_billing_date = Date.new(last_month_date.year, last_month_date.month, billing_date.day)

    # 請求日と今日の日にちが一致。もしくは請求日が月末で今日も月末なら満額請求
    if require_full_bill
      plan_price = account.plan_price
      result = plan_price
    end
    result
  end

  # 満額請求か判定
  def require_full_bill
    current_day = Time.zone.now.day
    billing_cycle_anchor_day = billing_cycle_anchor_datetime.day
    # 請求日と今日が同じ日にちならtrue
    return true if current_day.eql?(billing_cycle_anchor_day)
    # 今日の日にちが先月末の日にちより大きければ満額請求
    last_month_date = Time.zone.now - 1.months
    last_month_day = last_month_date.day
    return true if current_day > last_month_day
    # それ以外はfalse
    return false
  end
end
