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
    reserve_frames.each do |frame|
      if frame.is_repeat
        case frame.repeat_interval_type
        when 'Day' then
          (Date.parse(frame.start_at.to_s)..(Date.parse(frame.repeat_end_date.to_s))).each do |date|
            result << {
              start: date,
              title: frame.title,
              url: '/reserve/' + frame.id.to_s
            }
          end
        when 'Week' then
          (Date.parse(frame.start_at.to_s)..Date.parse(frame.repeat_end_date.to_s)).select{|d| d.wday == frame.start_at.wday}.each do |date|
            result << {
              start: date,
              title: frame.title,
              url: '/reserve/' + frame.id.to_s
            }
          end
        when 'Month' then
          (Date.parse(frame.start_at.to_s)..Date.parse(frame.repeat_end_date.to_s)).select{|d| d.day == repeat.repeat_interval_month_date}.each do |date|
            result << {
              start: date,
              title: frame.title,
              url: '/reserve/' + frame.id.to_s
            }
          end
        else
        end
      else
        result << {
          start: frame.start_at,
          title: frame.title,
          url: '/reserve/' + frame.id.to_s
        }
      end
    end
    result
  end
end
