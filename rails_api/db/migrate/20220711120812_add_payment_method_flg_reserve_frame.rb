class AddPaymentMethodFlgReserveFrame < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :is_local_payment_enable, :boolean
    add_column :reserve_frames, :is_ticket_payment_enable, :boolean
    add_column :reserve_frames, :is_monthly_plan_payment_enable, :boolean
  end

  def down
    remove_column :reserve_frames, :is_local_payment_enable, :boolean
    remove_column :reserve_frames, :is_ticket_payment_enable, :boolean
    remove_column :reserve_frames, :is_monthly_plan_payment_enable, :boolean
  end
end
