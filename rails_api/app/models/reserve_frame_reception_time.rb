class ReserveFrameReceptionTime < ApplicationRecord
  def reception_start_date_input_value
    reception_start_time.strftime("%H:%M")
  end

  def reception_end_date_input_value
    reception_end_time.strftime("%H:%M")
  end
end
