class CreateBusinessHours < ActiveRecord::Migration[7.0]
  def change
    create_table :business_hours do |t|
      t.integer :account_id, null: false
      t.time :mon_start
      t.time :mon_end
      t.time :tue_start
      t.time :tue_end
      t.time :wed_start
      t.time :wed_end
      t.time :thu_start
      t.time :thu_end
      t.time :fri_start
      t.time :fri_end
      t.time :sat_start
      t.time :sat_end
      t.time :sun_start
      t.time :sun_end
      t.time :holiday_start
      t.time :holiday_end
      t.time :mon_break_start
      t.time :mon_break_end
      t.time :tue_break_start
      t.time :tue_break_end
      t.time :wed_break_start
      t.time :wed_break_end
      t.time :thu_break_start
      t.time :thu_break_end
      t.time :fri_break_start
      t.time :fri_break_end
      t.time :sat_break_start
      t.time :sat_break_end
      t.time :sun_break_start
      t.time :sun_break_end
      t.time :holiday_break_start
      t.time :holiday_break_end

      t.timestamps
    end
  end
end
