class CreateReserveFrameCreditCardPaymentPrices < ActiveRecord::Migration[7.0]
  def change
    create_table :reserve_frame_credit_card_payment_prices do |t|
      t.integer :reserve_frame_id, null: false
      t.string :name, null: false
      t.integer :price, null: false
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
