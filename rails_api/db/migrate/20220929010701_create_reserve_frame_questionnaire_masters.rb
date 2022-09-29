class CreateReserveFrameQuestionnaireMasters < ActiveRecord::Migration[7.0]
  def change
    create_table :reserve_frame_questionnaire_masters do |t|
      t.integer :reserve_frame_id
      t.integer :questionnaire_master_id

      t.timestamps
    end
  end
end
