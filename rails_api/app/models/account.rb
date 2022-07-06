class Account < ApplicationRecord
  has_one :business_hour
  has_many :merchant_users
  has_many :websites
  has_many :payment_methods
  has_many :ticket_masters
  has_many :monthly_payment_plans
  has_many :resources
  has_many :reserve_frames

  def reserve_calendar_json
    result = []
    self.reserve_frames.each do |frame|
      if frame.is_repeat
        case frame.repeat_interval_type
        when 'Day' then
          (Date.parse(frame.start_at)..Date.parse(frame.repeat_interval_month_date)).each do |date|
            result << { start: date, title: frame.title, id: frame.id }
          end
        when 'Week' then
          (Date.parse(frame.start_at)..Date.parse(frame.repeat_interval_month_date)).select{|d| d.wday == frame.start_at.wday}.each do |date|
            result << {
              start: date,
              title: frame.title,
              id: frame.id
            }
          end
        when 'Month' then
          (Date.parse(frame.start_at)..Date.parse(frame.repeat_interval_month_date)).select{|d| d.day == repeat.repeat_interval_month_date}.each do |date|
            result << {
              start: date,
              title: frame.title,
              id: frame.id
            }
          end
        else
        end
      else
        result << { start: frame.start_at, title: frame.title, id: frame.id }
      end
    end
    result
  end
end
