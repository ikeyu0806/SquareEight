include CalendarContent

class MonthCalendarService
  def initialize(year, month, reserve_frame_id = nil)
    @target_year = year
    @target_month = month
    @reserve_frame_id = reserve_frame_id
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
    ((month_first_wday(year, month) + month_end_date(month)).quo(WEEK_DAYS).to_f).ceil
  end

  def reserve_frame
    ReserveFrame.find(@reserve_frame_id) if @reserve_frame_id.present?
  end

  # [{date: 27, text: '', url: ''},{date: 28, text: '', url: ''}]
  def reserve_content_json
    if reserve_frame.present?
      reserve_frame_json = reserve_frame.calendar_json(@target_year, @target_month)
    end
    result = []
    # カレンダー行数
    week_count_num = week_count(@target_year, @target_month)
    # 表示月の最終日
    current_month_end_date = month_end_date(@target_month)
    # 表示される先月の年と月
    display_last_year = display_last_year(@target_year, @target_month)
    last_month = last_month(@target_month)
    # 表示される最終日付と曜日
    display_last_month_end_date = month_end_date(last_month)
    display_last_month_end_date_wday = month_end_wday(display_last_year, last_month)
    # 先月の最終日時が月曜の場合は先月の日付表示不要
    if display_last_month_end_date_wday == MON
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
          date_json = {
            date_text: num,
            full_date: Date.new(@target_year, @target_month, num).strftime("%Y-%m-%d")
          }
          same_date_reserve_frame_json = reserve_frame_json.find{|r| r[:start] == date_json[:full_date]} if reserve_frame_json.present?
          date_json = date_json.merge(same_date_reserve_frame_json) if same_date_reserve_frame_json.present?
          week_days_array.push(date_json)
        end
        (WEEK_DAYS - display_last_month_end_date_wday - 1).times do |num|
          current_date = num + 1
          date_json = {
            date_text: current_date,
            full_date: Date.new(@target_year, @target_month, current_date).strftime("%Y-%m-%d")
          }
          same_date_reserve_frame_json = reserve_frame_json.find{|r| r[:start] == date_json[:full_date]} if reserve_frame_json.present?
          date_json = date_json.merge(same_date_reserve_frame_json) if same_date_reserve_frame_json.present?
          week_days_array.push(date_json)
        end
        result.push(week_days_array)
      else
        WEEK_DAYS.times do |num|
          if current_date == current_month_end_date
            # 翌月
            current_date = 1
            @target_month = @target_month + 1
          else
            current_date = current_date + 1
          end
          date_json = {
            date_text: current_date,
            full_date: Date.new(@target_year, @target_month, current_date).strftime("%Y-%m-%d")
          }
          same_date_reserve_frame_json = reserve_frame_json.find{|r| r[:start] == date_json[:full_date]} if reserve_frame_json.present?
          date_json = date_json.merge(same_date_reserve_frame_json) if same_date_reserve_frame_json.present?
          week_days_array.push(date_json)
        end
        result.push(week_days_array)
      end
    end
    result
  end
end
