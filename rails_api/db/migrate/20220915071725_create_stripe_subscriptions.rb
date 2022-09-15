class CreateStripeSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :stripe_subscriptions do |t|
      t.integer :end_user_id, null: false
      t.integer :monthly_payment_plan_id, null: false

      t.timestamps
    end
  end
end
