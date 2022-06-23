class CreatePaymentMethods < ActiveRecord::Migration[7.0]
  def change
    create_table :payment_methods do |t|
      t.integer :account_id, null: false, comment: 'AccountID'
      t.string :stripe_card_id, comment: 'StripeカードID'
      t.integer :payment_type, null: false, comment: '支払い種別'
      t.boolean :selected, default: false, comment: ''

      t.timestamps
    end
  end
end
