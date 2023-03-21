module SubscriptionBillingModule
  extend ActiveSupport::Concern

  def billing_target_day
    if Time.zone.now.end_of_month.day == Time.zone.now.day
      case Time.zone.now.day
      # 今日が月末で28日だったら28, 29,30, 31
      when 28 then
        target_day = [28, 29, 30, 31]
      # 今日が月末で29日だったら29,30, 31
      when 29 then
        target_day = [29, 30, 31]
      # 今日が月末で30日だったら30, 31
      when 30 then
        target_day = [30, 31]
      # 今日が月末で31日だったら31
      when 31 then
        target_day = 31
      end
    else
      target_day = Time.zone.now.day
    end
    target_day
  end
end
