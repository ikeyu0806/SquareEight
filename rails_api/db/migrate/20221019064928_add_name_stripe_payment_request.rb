class AddNameStripePaymentRequest < ActiveRecord::Migration[7.0]
  def up
    add_column :stripe_payment_requests, :name, :string
  end

  def down
    remove_column :stripe_payment_requests, :name, :string
  end
end
