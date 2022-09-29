class AddQuestionnaireMasterIdReserveFrame < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :questionnaire_master_id, :integer
  end

  def down
    remove_column :reserve_frames, :questionnaire_master_id, :integer
  end
end
