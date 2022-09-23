class CreateReserveFrameCreditCardPaymentPrices < ActiveRecord::Migration[7.0]
  def change
    create_table :reserve_frame_credit_card_payment_prices do |t|
      t.string :name, null: false
      t.integer :price, null: false

      t.timestamps
    end
  end
end
