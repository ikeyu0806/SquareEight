class AddDeliveryDateOrderItem < ActiveRecord::Migration[7.0]
  def up
    add_column :order_items, :delivery_date_text, :string
  end

  def down
    remove_column :order_items, :delivery_date_text, :string
  end
end
