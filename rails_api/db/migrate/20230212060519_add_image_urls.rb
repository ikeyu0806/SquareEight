class AddImageUrls < ActiveRecord::Migration[7.0]
  def up
    add_column :resources, :resource_image2_account_s3_image_id, :integer
    add_column :resources, :resource_image3_account_s3_image_id, :integer
    add_column :resources, :resource_image4_account_s3_image_id, :integer
    add_column :resources, :resource_image5_account_s3_image_id, :integer
    add_column :reserve_frames, :image2_account_s3_image_id, :integer
    add_column :reserve_frames, :image3_account_s3_image_id, :integer
    add_column :reserve_frames, :image4_account_s3_image_id, :integer
    add_column :reserve_frames, :image5_account_s3_image_id, :integer
    add_column :products, :image2_account_s3_image_id, :integer
    add_column :products, :image3_account_s3_image_id, :integer
    add_column :products, :image4_account_s3_image_id, :integer
    add_column :products, :image5_account_s3_image_id, :integer
    add_column :ticket_masters, :image2_account_s3_image_id, :integer
    add_column :ticket_masters, :image3_account_s3_image_id, :integer
    add_column :ticket_masters, :image4_account_s3_image_id, :integer
    add_column :ticket_masters, :image5_account_s3_image_id, :integer
    add_column :monthly_payment_plans, :image2_account_s3_image_id, :integer
    add_column :monthly_payment_plans, :image3_account_s3_image_id, :integer
    add_column :monthly_payment_plans, :image4_account_s3_image_id, :integer
    add_column :monthly_payment_plans, :image5_account_s3_image_id, :integer
  end

  def down
    remove_column :resources, :resource_image2_account_s3_image_id, :integer
    remove_column :resources, :resource_image3_account_s3_image_id, :integer
    remove_column :resources, :resource_image4_account_s3_image_id, :integer
    remove_column :resources, :resource_image5_account_s3_image_id, :integer
    remove_column :reserve_frames, :image2_account_s3_image_id, :integer
    remove_column :reserve_frames, :image3_account_s3_image_id, :integer
    remove_column :reserve_frames, :image4_account_s3_image_id, :integer
    remove_column :reserve_frames, :image5_account_s3_image_id, :integer
    remove_column :products, :image2_account_s3_image_id, :integer
    remove_column :products, :image3_account_s3_image_id, :integer
    remove_column :products, :image4_account_s3_image_id, :integer
    remove_column :products, :image5_account_s3_image_id, :integer
    remove_column :ticket_masters, :image2_account_s3_image_id, :integer
    remove_column :ticket_masters, :image3_account_s3_image_id, :integer
    remove_column :ticket_masters, :image4_account_s3_image_id, :integer
    remove_column :ticket_masters, :image5_account_s3_image_id, :integer
    remove_column :monthly_payment_plans, :image2_account_s3_image_id, :integer
    remove_column :monthly_payment_plans, :image3_account_s3_image_id, :integer
    remove_column :monthly_payment_plans, :image4_account_s3_image_id, :integer
    remove_column :monthly_payment_plans, :image5_account_s3_image_id, :integer
  end
end
