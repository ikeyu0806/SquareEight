class AddStripePaymentRequestSendMethodColumns < ActiveRecord::Migration[7.0]
  def up
    add_column :stripe_payment_requests, :send_method, :integer, default: 0
    add_column :stripe_payment_requests, :line_user_id, :integer
  end

  def down
    remove_column :stripe_payment_requests, :send_method, :integer, default: 0
    remove_column :stripe_payment_requests, :line_user_id, :integer
  end
end
