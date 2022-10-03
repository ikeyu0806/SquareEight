class AddDeliveryDatetimeTargetFlgProduct < ActiveRecord::Migration[7.0]
  def up
    add_column :products, :delivery_datetime_target_flg, :boolean, default: true
  end

  def down
    remove_column :products, :delivery_datetime_target_flg, :boolean
  end
end
