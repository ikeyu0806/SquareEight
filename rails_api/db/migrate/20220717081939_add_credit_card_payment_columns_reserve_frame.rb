class AddCreditCardPaymentColumnsReserveFrame < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :is_creadit_card_payment_enable, :boolean
    add_column :reserve_frames, :credit_card_payment_price, :integer
  end

  def down
    remove_column :reserve_frames, :is_creadit_card_payment_enable, :boolean
    remove_column :reserve_frames, :credit_card_payment_price, :integer
  end
end
