class AddPaymentMethodInfoReservation < ActiveRecord::Migration[7.0]
  def up
    add_column :reservations, :ticket_master_id, :integer
    add_column :reservations, :monthly_payment_plan_id, :integer
    add_column :reservations, :stripe_payment_intent_id, :string
  end

  def down
    remove_column :reservations, :ticket_master_id, :integer
    remove_column :reservations, :monthly_payment_plan_id, :integer
    remove_column :reservations, :stripe_payment_intent_id, :string
  end
end
