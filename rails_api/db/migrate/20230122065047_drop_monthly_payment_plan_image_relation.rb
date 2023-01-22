class DropMonthlyPaymentPlanImageRelation < ActiveRecord::Migration[7.0]
  def up
    drop_table :monthly_payment_plan_image_relations
  end

  def down
    fail ActiveRecord::IrreversibleMigration
  end
end
