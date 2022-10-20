class CreateQuestionnaireAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :questionnaire_answers do |t|
      t.integer :questionnaire_master_id
      t.integer :customer_id
      t.string :title
      t.text :answers_json
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
