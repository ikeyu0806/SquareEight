include CalendarContent

class MonthCalendarService
  def initialize(year, month)
    @target_year = year
    @target_month = month
  end

  WEEK_DAYS = 7

  SUN = 0
  MON = 1
  TUE = 2
  WED = 3
  THU = 4
  FRI = 5
  SAT = 6

  # 日曜始まり月表示カレンダーの行数
  def week_count(year, month)
    if month == 1
      last_month = 12
      last_year = year - 1
    else
      last_month = month - 1
      last_year = year
    end
    (month_first_wday(year, month) + (month_end_wday(last_year, last_month) + 1).quo(WEEK_DAYS).to_f).ceil
  end

  # [{date: 27, text: '', url: ''},{date: 28, text: '', url: ''}]
  def end_user_reserve_content_json
    result = []
    # カレンダー行数
    week_count_num = week_count(@target_year, @target_month)
    display_last_year = display_last_year(@target_year, @target_month)
    current_month_end_date = month_end_date(@target_month)
    last_month = last_month(@target_month)
    display_last_month_end_date = month_end_date(last_month)
    display_last_month_end_date_wday = month_end_wday(display_last_year, last_month)
    if display_last_month_end_date_wday == SUN
      display_last_month_start_date = nil
    else
      display_last_month_start_date = display_last_month_end_date - display_last_month_end_date_wday
    end
    current_date = 0
    week_count_num.times do |row|
      week_days_array = []
      # カレンダー1行目
      # 前月を表示する場合
      if row == 0 && display_last_month_start_date.present?
        (display_last_month_start_date..display_last_month_end_date).each do |num|
          week_days_array.push({date: num})
        end
        (WEEK_DAYS - display_last_month_end_date_wday - 1).times do |num|
          current_date = num + 1
          week_days_array.push({date: current_date})
        end
        result.push(week_days_array)
      else
        WEEK_DAYS.times do |num|
          if current_date == current_month_end_date
            current_date = 1
          else
            current_date = current_date + 1
          end
          week_days_array.push({date: current_date})
        end
        result.push(week_days_array)
      end
    end
    result
  end
end
