include CalendarContent

class ReserveFrame < ApplicationRecord
  belongs_to :account
  has_many :unreservable_frames
  has_many :reserve_frame_resorces
  has_many :resources, through: :reserve_frame_resorces
  has_many :reserve_frame_monthly_payment_plans
  has_many :monthly_payment_plans, through: :reserve_frame_monthly_payment_plans
  has_many :reserve_frame_ticket_masters
  has_many :ticket_masters, through: :reserve_frame_ticket_masters
  has_many :reserve_frame_reception_times
  has_many :reservations

  enum repeat_interval_type: { Day: 0, Week: 1, Month: 2 }
  enum publish_status: { Unpublish: 0, Publish: 1 }
  enum reception_type: { Immediate: 0, Temporary: 1, PhoneOnly: 2 }
  enum cancel_reception: { OnlyOnTheDay: 0, PossibleBeforeTheDay: 1 }

  def payment_methods
    result = {}

    if is_local_payment_enable?
      result[:local_payment_price] = local_payment_price
    end

    if is_credit_card_payment_enable?
      result[:credit_card_payment_price] = credit_card_payment_price
    end

    if is_monthly_plan_payment_enable?
      monthly_payment_plan_info = []
      reserve_frame_monthly_payment_plans.each do |reserve_plan|
        monthly_payment_plan_info.push({id: reserve_plan.monthly_payment_plan.id, monthly_payment_plan_name: reserve_plan.monthly_payment_plan.name})
      end
      result[:enable_monthly_payment_plans] = monthly_payment_plan_info
    end

    if is_ticket_payment_enable?
      ticket_payment_info = []
      reserve_frame_ticket_masters.each do |reserve_ticket|
        ticket_payment_info.push({id: reserve_ticket.ticket_master.id, ticket_name: reserve_ticket.ticket_master.name, consume_number: reserve_ticket.consume_number})
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

    if is_credit_card_payment_enable?
      result.push("クレジットカード払い: ¥" + credit_card_payment_price.to_s)
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
      repeat_interval_number_month.to_s + "ヶ月ごとの" + repeat_interval_month_date.to_s + "日に設定"
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

  def repeat_month_list
    result = []
    skip_flg_count = 0
    range_all_month_list = (start_at.to_date..repeat_end_date.to_date).map do |date| 
      date.strftime("%Y-%m")
    end.uniq
    range_all_month_list.each do |year_month|
      skip_flg_count = skip_flg_count - 1 unless skip_flg_count.negative?
      if skip_flg_count.negative?
        result.push(year_month)
        skip_flg_count = repeat_interval_number_month
      end
    end
    result
  end

  def calendar_json(year, month, week = nil)
    result = []
    range_start_date = Date.new(year, month)
    range_end_date = Date.new(year, month, -1)
    loop_start_date =  Date.parse(self.start_at.to_s) < Date.today ? Date.today : Date.parse(self.start_at.to_s)
    loop_start_date = loop_start_date < range_start_date ? range_start_date : loop_start_date
    loop_end_date = Date.parse(self.repeat_end_date.to_s)
    loop_end_date = loop_end_date - reception_start_day_before.days
    loop_end_date = loop_end_date > range_end_date ? range_end_date : loop_end_date

    if self.is_repeat
      case self.repeat_interval_type
      when 'Day' then
        if is_every_day_repeat
          (loop_start_date..loop_end_date).each do |date|
            result << {
              start: date.strftime("%Y-%m-%d"),
              title: '予約可能',
              url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
            }
          end
        else
          skip_flg_count = 0 # repeat_interval_number_dayで間隔を反映させる処理に使う
          (loop_start_date..loop_end_date).each do |date|
            skip_flg_count = skip_flg_count - 1 unless skip_flg_count.negative?
            if skip_flg_count.negative?
              result << {
                start: date.strftime("%Y-%m-%d"),
                title: '予約可能',
                url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
              }
              skip_flg_count = repeat_interval_number_day
            end
          end
        end
      when 'Week' then
        if is_every_week_repeat
          (loop_start_date..loop_end_date).select{|d| d.wday == self.start_at.wday}.each do |date|
            result << {
              start: date.strftime("%Y-%m-%d"),
              title: '予約可能',
              url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
            }
          end
        else
          skip_flg_count = 0 # repeat_interval_number_weekで間隔を反映させる処理に使う
          (loop_start_date..loop_end_date).select{|d| d.wday == self.start_at.wday}.each do |date|
            skip_flg_count = skip_flg_count - 1 unless skip_flg_count.negative?
            if skip_flg_count.negative?
              result << {
                start: date.strftime("%Y-%m-%d"),
                title: '予約可能',
                url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
              }
              skip_flg_count = repeat_interval_number_week
            end
          end
        end
      when 'Month' then
        if is_every_month_repeat
          (loop_start_date..loop_end_date).select{|d| d.day == self.repeat_interval_month_date}.each do |date|
            result << {
              start: date.strftime("%Y-%m-%d"),
              title: '予約可能',
              url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
            }
          end
        else
          repeat_month_list_result = repeat_month_list
          (loop_start_date..loop_end_date).select{|d| d.day == self.repeat_interval_month_date}.each do |date|
            if repeat_month_list_result.include?(date.strftime("%Y-%m"))
              result << {
                start: date.strftime("%Y-%m-%d"),
                title: '予約可能',
                url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
              }
            end
          end
        end
      else
      end
    else
      result << {
        start: self.start_at,
        title: '予約可能',
        url: '/reserve/' + self.id.to_s + '?date=' + self.start_at.strftime("%Y-%m-%d")
      }
    end
    result
  end

  def resouce_ids
    reserve_frame_resorces.pluck(:resource_id)
  end

  def monthly_payment_plan_ids
    monthly_payment_plans.pluck(:monthly_payment_plan_id)
  end

  def reservable_frame_ticket_master
    reserve_frame_ticket_masters.pluck(:id, :ticket_master_id, :consume_number)
  end

  def reserve_frame_reception_times_values
    result = []
    reserve_frame_reception_times.each do |reception_time|
      result.push({ reception_start_time: reception_time.reception_start_date_input_value,
                    reception_end_time: reception_time.reception_end_date_input_value })
    end
    result
  end

  def start_date_input_value
    start_at.strftime("%Y-%m-%d")
  end

  def display_start_at
    start_at.strftime("%Y/%m/%d")
  end

  def display_end_at
    repeat_end_date.strftime("%Y/%m/%d")
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
