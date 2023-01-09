class AddEmailDeliveryTarget < ActiveRecord::Migration[7.0]
  def up
    add_column :delivery_targets, :email, :string
  end

  def down
    remove_column :delivery_targets, :email, :string
  end
end
