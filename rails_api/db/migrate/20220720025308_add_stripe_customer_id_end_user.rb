class AddStripeCustomerIdEndUser < ActiveRecord::Migration[7.0]
  def up
    add_column :end_users, :stripe_customer_id, :string
  end

  def down
    remove_column :end_users, :stripe_customer_id, :string
  end
end
