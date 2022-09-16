class CreateSystemStripeSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :system_stripe_subscriptions do |t|
      t.integer :account_id, null: false
      t.integer :service_plan, null: false
      t.string :stripe_subscription_id, null: false
      t.datetime :canceled_at

      t.timestamps
    end
  end
end
