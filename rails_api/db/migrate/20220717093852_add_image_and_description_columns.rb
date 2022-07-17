class AddImageAndDescriptionColumns < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :s3_object_public_url, :string
    add_column :ticket_masters, :s3_object_public_url, :string
    add_column :monthly_payment_plans, :s3_object_public_url, :string
    add_column :ticket_masters, :description, :text
  end

  def down
    remove_column :reserve_frames, :s3_object_public_url, :string
    remove_column :ticket_masters, :s3_object_public_url, :string
    remove_column :monthly_payment_plans, :s3_object_public_url, :string
    remove_column :ticket_masters, :description, :text
  end
end
