class AddReceptionPhoneNumberReserveFrame < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :reception_phone_number, :string
  end

  def down
    remove_column :reserve_frames, :reception_phone_number, :string
  end
  
end
