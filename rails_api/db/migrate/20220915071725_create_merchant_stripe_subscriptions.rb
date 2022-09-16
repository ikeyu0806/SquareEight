class CreateMerchantStripeSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :merchant_stripe_subscriptions do |t|
      t.integer :end_user_id, null: false
      t.integer :monthly_payment_plan_id, null: false
      t.string :stripe_subscription_id, null: false
      t.datetime :canceled_at

      t.timestamps
    end
  end
end
