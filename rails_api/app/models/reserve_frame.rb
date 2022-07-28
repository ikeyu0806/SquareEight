class ReserveFrame < ApplicationRecord
  belongs_to :account
  has_many :unreservable_frames
  has_many :reserve_frame_resorces
  has_many :reserve_frame_monthly_payment_plans
  has_many :monthly_payment_plans, through: :reserve_frame_monthly_payment_plans
  has_many :reserve_frame_ticket_masters
  has_many :ticket_masters, through: :reserve_frame_ticket_masters

  enum repeat_interval_type: { Day: 0, Week: 1, Month: 2 }
  enum publish_status: { Unpublish: 0, Publish: 1 }
  enum reception_type: { Immediate: 0, Temporary: 1, PhoneOnly: 2 }
  enum cancel_reception: { OnlyOnTheDay: 0, PossibleBeforeTheDay: 1 }

  def payment_methods
    result = {}

    if is_local_payment_enable?
      result[:local_payment_price] = local_payment_price
    end

    if is_monthly_plan_payment_enable?
      monthly_payment_plan_info = []
      reserve_frame_monthly_payment_plans.each do |reserve_plan|
        monthly_payment_plan_info.push({monthly_payment_plan_name: reserve_plan.monthly_payment_plan.name})
      end
      result[:enable_monthly_payment_plans] = monthly_payment_plan_info
    end

    if is_ticket_payment_enable?
      ticket_payment_info = []
      reserve_frame_ticket_masters.each do |reserve_ticket|
        ticket_payment_info.push({ticket_name: reserve_ticket.ticket_master.name, consume_number: reserve_ticket.consume_number})
      end
      result[:enable_tickets] = ticket_payment_info
    end
    result
  end

  def payment_methods_text
    result = []
    if is_local_payment_enable?
      result.push("現地払い: ¥" + local_payment_price.to_s)
    end

    if is_monthly_plan_payment_enable?
      monthly_payment_plans.each do |reserve_plan|
        result.push(reserve_plan.plan_text)
      end
    end

    if is_ticket_payment_enable?
      reserve_frame_ticket_masters.each do |reserve_ticket|
        result.push(reserve_ticket.ticket_master.name + " 消費枚数: " + reserve_ticket.consume_number.to_s + "枚")
      end
    end
    result
  end

  def repeat_setting_text
    case repeat_interval_type
    when "Day"
      repeat_interval_number_day.to_s + "日" + "ごとに繰り返す"
    when "Week"
      repeat_interval_number_week.to_s + "週間" + "ごとに繰り返す"
    when "Month"
      repeat_interval_number_month.to_s + "ヶ月ごとの" + repeat_interval_month_date + "日に設定"
    else
      raise
    end
  end

  def reception_type_text
    case reception_type
    when "Immediate"
      "即時予約"
    when "Temporary"
      "仮予約"
    when "PhoneOnly"
      "電話のみ"
    else
      raise
    end
  end

  def calendar_json
    result = []
    if self.is_repeat
      case self.repeat_interval_type
      when 'Day' then
        (Date.parse(self.start_at.to_s)..(Date.parse(self.repeat_end_date.to_s))).each do |date|
          result << {
            start: date,
            title: self.title,
            url: '/reserve/' + self.id.to_s
          }
        end
      when 'Week' then
        (Date.parse(frame.start_at.to_s)..Date.parse(frame.repeat_end_date.to_s)).select{|d| d.wday == frame.start_at.wday}.each do |date|
          result << {
            start: date,
            title: self.title,
            url: '/reserve/' + self.id.to_s
          }
        end
      when 'Month' then
        (Date.parse(frame.start_at.to_s)..Date.parse(frame.repeat_end_date.to_s)).select{|d| d.day == repeat.repeat_interval_month_date}.each do |date|
          result << {
            start: date,
            title: self.title,
            url: '/reserve/' + self.id.to_s
          }
        end
      else
      end
    else
      result << {
        start: self.start_at,
        title: self.title,
        url: '/reserve/' + self.id.to_s
      }
    end
    result
  end

  def display_start_at
    start_at.strftime("%Y/%m/%d %H:%M")
  end

  def display_end_at
    end_at.strftime("%Y/%m/%d %H:%M")
  end

  def delete_s3_image
    client = Aws::S3::Client.new(
      access_key_id: ENV['AWS_ACCESS_KEY'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: "ap-northeast-1"
    )
    client.delete_object(bucket: ENV["PRODUCT_IMAGE_BUCKET"], key: self.s3_object_name)
  end
end
