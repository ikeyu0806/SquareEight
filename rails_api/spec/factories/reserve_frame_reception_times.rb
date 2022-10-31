FactoryBot.define do
  factory :reserve_frame_reception_time, class: ReserveFrameReceptionTime do   
    reception_start_time { Time.new(Time.zone.now.year, Time.zone.now.month, Time.zone.now.day, 14) }
    reception_end_time { Time.new(Time.zone.now.year, Time.zone.now.month, Time.zone.now.day, 15) }
  end
end
