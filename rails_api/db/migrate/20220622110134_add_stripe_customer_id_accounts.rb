class AddStripeCustomerIdAccounts < ActiveRecord::Migration[7.0]
  def up
    add_column :accounts, :stripe_customer_id, :string, comment: 'Stripe顧客ID'
  end

  def down
    remove_column :accounts, :stripe_customer_id, :string
  end
end
