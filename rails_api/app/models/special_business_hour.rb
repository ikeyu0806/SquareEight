class SpecialBusinessHour < ApplicationRecord
  def date
    start_at.strftime("%y-%m-%d")
  end

  def start_time
    start_at.strftime("%H:%M")
  end

  def end_time
    end_at.strftime("%H:%M")
  end
end

