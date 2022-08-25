class CreateQuestionnaireMasters < ActiveRecord::Migration[7.0]
  def change
    create_table :questionnaire_masters do |t|
      t.integer :account_id
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
