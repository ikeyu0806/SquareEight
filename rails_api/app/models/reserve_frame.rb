include CalendarContent

class ReserveFrame < ApplicationRecord
  belongs_to :account
  has_many :unreservable_frames
  has_many :out_of_range_frames
  has_many :reserve_frame_resorces
  has_many :resources, through: :reserve_frame_resorces
  has_many :reserve_frame_monthly_payment_plans
  has_many :monthly_payment_plans, through: :reserve_frame_monthly_payment_plans
  has_many :reserve_frame_ticket_masters
  has_many :ticket_masters, through: :reserve_frame_ticket_masters
  has_many :reserve_frame_reception_times
  has_many :reservations
  has_many :reserve_frame_local_payment_prices
  has_many :reserve_frame_credit_card_payment_prices

  # WDayは週ごと
  enum repeat_interval_type: { Day: 0, Week: 1, Month: 2, WDay: 3 }
  enum publish_status: { Unpublish: 0, Publish: 1 }
  enum reception_type: { Immediate: 0, Temporary: 1, PhoneOnly: 2 }
  enum cancel_reception: { OnlyOnTheDay: 0, PossibleBeforeTheDay: 1 }

  scope :enabled, -> { where(deleted_at: nil) }

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
      if reserve_frame_local_payment_prices.present?
        multi_local_payment_text = []
        reserve_frame_local_payment_prices.each do |local_payment|
          multi_local_payment_text.push(local_payment.name + ": ￥" + local_payment.price.to_s)
        end
        result.push("現地払い: " + multi_local_payment_text.join(', '))
      else
        result.push("現地払い: ¥" + local_payment_price.to_s)
      end
    end

    if is_credit_card_payment_enable?
      multi_credir_payment_text = []
      reserve_frame_credit_card_payment_prices.each do |credit_payment|
        multi_credir_payment_text.push(credit_payment.name + ": ￥" + credit_payment.price.to_s)
      end
      result.push("クレジットカード払い: ¥" + multi_credir_payment_text.join(''))
    else
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
    when "WDay"
      repeat_wdays = []
      repeat_wdays.push("日") if is_repeat_sun?
      repeat_wdays.push("月") if is_repeat_mon?
      repeat_wdays.push("火") if is_repeat_tue?
      repeat_wdays.push("水") if is_repeat_wed?
      repeat_wdays.push("木") if is_repeat_thu?
      repeat_wdays.push("金") if is_repeat_fri?
      repeat_wdays.push("土") if is_repeat_sat?
      "曜日ごとに繰り返す: " + repeat_wdays.join(", ")
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

  def unreservable_frames_datetimes_range
    unreservable_frames.map { |frame| frame.start_at..frame.end_at }
  end

  def is_cover_unreservable_frames_datetimes(date)
    unreservable_frames_datetimes_range.each do |unreservable_frames_datetime|
      return true if unreservable_frames_datetime.cover?(date)
    end
    return false
  end

  def out_of_range_frames_datetimes_range
    out_of_range_frames.map { |frame| frame.start_at..frame.end_at }
  end

  def is_cover_out_of_range_frames_datetimes(date)
    out_of_range_frames_datetimes_range.each do |out_of_range_frames_datetime|
      return true if out_of_range_frames_datetime.cover?(date)
    end
    return false
  end

  def remaining_capacity_count_within_range(start_datetime, end_datetime)
    reservation_count = self.reservations.where(start_at: start_datetime, end_at: end_datetime, status: 'confirm').count
    return self.capacity - reservation_count
  end

  def remaining_capacity_count_with_datetime(datetime)
    reservation_count = self.reservations.where("start_at <= ? and end_at >= ?", datetime, datetime).count
    return self.capacity - reservation_count
  end

  # カレンダーの表示に使う
  def reservable_status_with_date(date)
    reserve_enable_flg_array = []
    self.reserve_frame_reception_times.each do |time|
      reserve_enable_flg = true
      self.reservations.where(start_at: date.beginning_of_day..date.end_of_day).each do |reservation|
        start_datetime = DateTime.new(date.year, date.month, date.day, time.reception_start_time.hour, time.reception_start_time.min, time.reception_start_time.sec, "+09:00")
        end_datetime = DateTime.new(date.year, date.month, date.day, time.reception_end_time.hour, time.reception_end_time.min, time.reception_end_time.sec, "+09:00")
        remaining_capacity_count = remaining_capacity_count_within_range(start_datetime, end_datetime)
        reserve_enable_flg = false if remaining_capacity_count <= 0
        reserve_enable_flg_array.push(reserve_enable_flg)
      end
    end
    if !reserve_enable_flg_array.uniq.include?(false)
      return { status: 'enable', text: '予約可能' }
    else
      return { status: 'disable', text: '予約不可' }
    end
  end

  def calendar_json(year, month, week = nil)
    result = []
    range_start_date = Date.new(year, month)
    range_end_date = Date.new(year, month, -1)
    loop_start_date =  Date.parse(self.start_at.to_s) < Date.today ? Date.today : Date.parse(self.start_at.to_s)
    loop_start_date = loop_start_date + cancel_reception_day_before.days if cancel_reception == "PossibleBeforeTheDay"
    loop_start_date = loop_start_date < range_start_date ? range_start_date : loop_start_date

    loop_end_date = Date.parse(self.repeat_end_date.to_s)
    # loop_end_date = loop_end_date - reception_start_day_before.days
    loop_end_date = loop_end_date > range_end_date ? range_end_date : loop_end_date

    if self.is_repeat
      case self.repeat_interval_type
      when 'Day' then
        if is_every_day_repeat
          (loop_start_date..loop_end_date).each do |date|
            next if is_cover_unreservable_frames_datetimes(date)
            status_json = self.reservable_status_with_date(date)
            result << {
              start: date.strftime("%Y-%m-%d"),
              title: status_json[:text],
              url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
            }
          end
        else
          skip_flg_count = 0 # repeat_interval_number_dayで間隔を反映させる処理に使う
          (loop_start_date..loop_end_date).each do |date|
            skip_flg_count = skip_flg_count - 1 unless skip_flg_count.negative?
            status_json = self.reservable_status_with_date(date)
            if skip_flg_count.negative?
              result << {
                start: date.strftime("%Y-%m-%d"),
                title: status_json[:text],
                url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
              }
              skip_flg_count = repeat_interval_number_day
            end
          end
        end
      when 'Week' then
        if is_every_week_repeat
          (loop_start_date..loop_end_date).select{|d| d.wday == self.start_at.wday}.each do |date|
            status_json = self.reservable_status_with_date(date)
            result << {
              start: date.strftime("%Y-%m-%d"),
              title: status_json[:text],
              url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
            }
          end
        else
          skip_flg_count = 0 # repeat_interval_number_weekで間隔を反映させる処理に使う
          (loop_start_date..loop_end_date).select{|d| d.wday == self.start_at.wday}.each do |date|
            skip_flg_count = skip_flg_count - 1 unless skip_flg_count.negative?
            status_json = self.reservable_status_with_date(date)
            if skip_flg_count.negative?
              result << {
                start: date.strftime("%Y-%m-%d"),
                title: status_json[:text],
                url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
              }
              skip_flg_count = repeat_interval_number_week
            end
          end
        end
      when 'Month' then
        if is_every_month_repeat
          (loop_start_date..loop_end_date).each do |date|
            status_json = self.reservable_status_with_date(date)
            if is_cover_out_of_range_frames_datetimes(date)
              result << {
                start: date.strftime("%Y-%m-%d"),
                title: status_json[:text],
                url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
              }
            end
            next unless date.day == self.repeat_interval_month_date
            result << {
              start: date.strftime("%Y-%m-%d"),
              title: status_json[:text],
              url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
            }
          end
        else
          repeat_month_list_result = repeat_month_list
          (loop_start_date..loop_end_date).each do |date|
            status_json = self.reservable_status_with_date(date)
            if is_cover_out_of_range_frames_datetimes(date)
              result << {
                start: date.strftime("%Y-%m-%d"),
                title: status_json[:text],
                url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
              }
            end
            next unless date.day == self.repeat_interval_month_date
            if repeat_month_list_result.include?(date.strftime("%Y-%m"))
              result << {
                start: date.strftime("%Y-%m-%d"),
                title: status_json[:text],
                url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
              }
            end
          end
        end
      when 'WDay'
        repeat_wdays = []
        repeat_wdays.push(0) if self.is_repeat_sun?
        repeat_wdays.push(1) if self.is_repeat_mon?
        repeat_wdays.push(2) if self.is_repeat_thu?
        repeat_wdays.push(3) if self.is_repeat_wed?
        repeat_wdays.push(4) if self.is_repeat_thu?
        repeat_wdays.push(5) if self.is_repeat_fri?
        repeat_wdays.push(6) if self.is_repeat_sat?

        (loop_start_date..loop_end_date).each do |date|
          status_json = self.reservable_status_with_date(date)
          if is_cover_out_of_range_frames_datetimes(date)
            result << {
              start: date.strftime("%Y-%m-%d"),
              title: status_json[:text],
              url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
            }
          else
            next unless repeat_wdays.include?(date.wday)
            result << {
              start: date.strftime("%Y-%m-%d"),
              title: status_json[:text],
              url: '/reserve/' + self.id.to_s + '?date=' + date.strftime("%Y-%m-%d")
            }
          end
        end
      else
      end
    else
      status_json = self.reservable_status_with_date(date)
      result << {
        start: self.start_at,
        title: status_json[:text],
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

  def repeat_end_date_input_value
    repeat_end_date.strftime("%Y-%m-%d")
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

  def out_of_range_frames_datetimes
    result = []
    out_of_range_frames.each do |out_of_range_frame|
      result.push({"start_at": out_of_range_frame.start_at.strftime("%Y-%m-%d %H:%M"),
                   "end_at": out_of_range_frame.end_at.strftime("%Y-%m-%d %H:%M")})
    end
    result
  end

  def unreservable_frames_datetimes
    result = []
    unreservable_frames.each do |unreservable_frame|
      result.push({"start_at": unreservable_frame.start_at.strftime("%Y-%m-%d %H:%M"),
                   "end_at": unreservable_frame.end_at.strftime("%Y-%m-%d %H:%M")})
    end
    result
  end

  def repeat_wdays
    result = []
    result.push('Sun') if self.is_repeat_sun?
    result.push('Mon') if self.is_repeat_mon?
    result.push('Tue') if self.is_repeat_tue?
    result.push('Wed') if self.is_repeat_wed?
    result.push('Thu') if self.is_repeat_thu?
    result.push('Fri') if self.is_repeat_fri?
    result.push('Sat') if self.is_repeat_sat?
    result
  end

  def validate_reservation(reservation)
    # 定員オーバチェック
    remaining_capacity_count = self.remaining_capacity_count_within_range(reservation.start_at, reservation.end_at)
    raise '定員オーバです' if remaining_capacity_count <= 0
    # リソースチェック
    resources = self.resources
    resources.each do |resource|
      resource_remaining_capacity_count = resource.remaining_capacity_count_within_range(start_datetime, end_datetime)
      raise '予約できません。使用する設備備品やスタッフなどのリソースが足りていません' if resource_remaining_capacity_count <= 0
    end
    return { status: 'ok', error_message: nil }
  rescue => e
    return { status: 'ng', error_message: error }
  end

  def local_payment_prices_with_number_of_people
    JSON.parse(reserve_frame_local_payment_prices.to_json(methods: [:reserve_number_of_people]))
  end

  def credit_card_payment_prices_with_number_of_people
    JSON.parse(reserve_frame_credit_card_payment_prices.to_json(methods: [:reserve_number_of_people]))
  end

  def logical_delete
    update!(deleted_at: Time.zone.now)
  end
end
