class AddAccountImageId < ActiveRecord::Migration[7.0]
  def up
    add_column :monthly_payment_plans, :image1_account_s3_image_id, :integer
    add_column :reserve_frames, :image1_account_s3_image_id, :integer
    add_column :ticket_masters, :image1_account_s3_image_id, :integer
    add_column :products, :image1_account_s3_image_id, :integer
  end

  def down
    remove_column :monthly_payment_plans, :image1_account_s3_image_id, :integer
    remove_column :reserve_frames, :image1_account_s3_image_id, :integer
    remove_column :ticket_masters, :image1_account_s3_image_id, :integer
    remove_column :products, :image1_account_s3_image_id, :integer
  end
end
