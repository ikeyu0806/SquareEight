class CreateQuestionnaireMasterFormOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :questionnaire_master_form_options do |t|
      t.integer :questionnaire_master_form_id
      t.string :answer
      t.text :textform_answer

      t.timestamps
    end
  end
end
