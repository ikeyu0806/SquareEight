class AddColumnsShop < ActiveRecord::Migration[7.0]
  def up
    add_column :shops, :phone_number, :string
    add_column :shops, :business_hours_text, :string
    add_column :shops, :parking_lot_guidance, :string
  end

  def down
    remove_column :shops, :phone_number, :string
    remove_column :shops, :business_hours_text, :string
    remove_column :shops, :parking_lot_guidance, :string
  end
end
