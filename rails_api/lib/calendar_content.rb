# カレンダー描画用json生成に使うモジュール
module CalendarContent
  DAY_OF_WEEK = [
    { id: 0, value: '日' },
    { id: 1, value: '月' },
    { id: 2, value: '火' },
    { id: 3, value: '水' },
    { id: 4, value: '木' },
    { id: 5, value: '金' },
    { id: 6, value: '土' }
  ]

  BIG_MOON = [1, 3, 5, 7, 8, 10, 12]
  WEEK_DAYS = 7

  def month_end_date(month)
    BIG_MOON.include?(month) ? 31 : month === 2 ?  28 : 30
  end

  # 引数で指定した月の初日の曜日
  def month_first_wday(year, month)
    Date.new(year, month, 1).wday
  end

  # 引数で指定した月の最終日の曜日
  def month_end_wday(year, month)
    end_date = month_end_date(month)
    Date.new(year, month, end_date).wday
  end

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
end
