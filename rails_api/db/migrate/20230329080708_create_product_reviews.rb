class CreateProductReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :product_reviews do |t|
      t.string :public_id, null: false
      t.text :comment, null: false
      t.integer :end_user_id, null: false
      t.integer :product_id, null: false
      t.integer :approval_status, default: 0

      t.timestamps
    end
  end
end
