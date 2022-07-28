class AddCreditCardPaymentColumnsReserveFrame < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :credit_card_payment_price, :integer
    add_column :reserve_frames, :is_credit_card_payment_enable, :boolean
  end

  def down
    remove_column :reserve_frames, :credit_card_payment_price, :integer
    remove_column :reserve_frames, :is_credit_card_payment_enable, :boolean
  end
end
