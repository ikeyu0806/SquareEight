class CreateQuestionnaireMasterForms < ActiveRecord::Migration[7.0]
  def change
    create_table :questionnaire_master_forms do |t|
      t.integer :questionnaire_master_id
      t.string :question
      t.integer :form_type

      t.timestamps
    end
  end
end
