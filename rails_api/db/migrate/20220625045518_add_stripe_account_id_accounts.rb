class AddStripeAccountIdAccounts < ActiveRecord::Migration[7.0]
  def up
    add_column :accounts, :stripe_account_id, :string
  end

  def down
    remove_column :accounts, :stripe_account_id, :string
  end
end
