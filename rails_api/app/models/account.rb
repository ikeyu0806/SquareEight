class Account < ApplicationRecord
  has_one :business_hour
  has_many :merchant_users
  has_many :websites
  has_many :webpages, through: :websites
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

  def page_links
    # 作成したWebページ、予約ページ、回数券購入ページ、月額課金プラン加入ページのリンクを返却
    result = []
    self.webpages.each do |w|
      result.push({ text: w.tag, value: '/webpages/' + w.id.to_s, label: 'Webページ'  })
    end
    self.reserve_frames.each do |r|
      result.push({ text: r.title, value: '/reserve/' + r.id.to_s, label: '予約ページ'  })
    end
    self.ticket_masters.each do |t|
      result.push({ text: t.name, value: '/ticket/' + t.id.to_s + 'purchase/', label: 'チケット購入ページ' })
    end
    self.monthly_payment_plans.each do |m|
      result.push({ text: m.name, value: '/monthly_payment/' + m.id.to_s + 'purchase/', label: '月額課金加入ページ' })
    end
    result
  end
end
