class CreateMonthlyPaymentPlanImageRelations < ActiveRecord::Migration[7.0]
  def change
    create_table :monthly_payment_plan_image_relations do |t|
      t.integer :account_s3_image_id
      t.integer :monthly_payment_plan_id
      t.integer :relation_status, default: 0
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
