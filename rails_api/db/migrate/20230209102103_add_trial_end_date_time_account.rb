class AddTrialEndDateTimeAccount < ActiveRecord::Migration[7.0]
  def up
    add_column :accounts, :trial_end_datetime, :datetime
  end

  def down
    remove_column :accounts, :trial_end_datetime, :datetime
  end
end
