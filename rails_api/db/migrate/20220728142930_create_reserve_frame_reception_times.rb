class CreateReserveFrameReceptionTimes < ActiveRecord::Migration[7.0]
  def change
    create_table :reserve_frame_reception_times do |t|
      t.time :reception_start_time, null: false
      t.time :reception_end_time

      t.timestamps
    end
  end
end
