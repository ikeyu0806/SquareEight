class AddViewableKeyReservation < ActiveRecord::Migration[7.0]
  def up
    add_column :reservations, :viewable_key, :string
  end

  def down
    remove_column :reservations, :viewable_key, :string
  end
end
