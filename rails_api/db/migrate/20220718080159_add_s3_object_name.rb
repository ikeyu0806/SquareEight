class AddS3ObjectName < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :s3_object_name, :string
    add_column :ticket_masters, :s3_object_name, :string
    add_column :monthly_payment_plans, :s3_object_name, :string
  end

  def down
    remove_column :reserve_frames, :s3_object_name, :string
    remove_column :ticket_masters, :s3_object_name, :string
    remove_column :monthly_payment_plans, :s3_object_name, :string
  end
end
