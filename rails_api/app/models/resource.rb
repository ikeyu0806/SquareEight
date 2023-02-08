class Resource < ApplicationRecord
  include PublicIdModule
  include Base64Image

  enum resource_type: { Staff: 0, Equipment: 1, Others: 99 }
  enum reception_time_setting: { NotSet: 0, AccountBusinessHour: 1, ResourceBusinessHour: 2 }

  belongs_to :account
  has_many :reserve_frame_resources
  has_many :reserve_frames, through: :reserve_frame_resources
  has_many :reservations, through: :reserve_frames
  has_many :shop_resources, dependent: :destroy

  def remaining_capacity_count_within_range(start_datetime, end_datetime)
    reservation_count = self.reservations.where(status: 'confirm').where(start_at: start_datetime, end_at: end_datetime).count
    return self.quantity - reservation_count
  end

  # S3にputするファイルとimage1_account_s3_image_public_url_column
  def register_s3_image(image_file, image1_account_s3_image_public_url_column)
    file_name = "resource_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
    image1_account_s3_image_public_url = put_s3_http_request_form_data(image_file, ENV["PRODUCT_IMAGE_BUCKET"], file_name)
    account_image = AccountS3Image.new
    account_image.account = self.account
    account_image.s3_object_public_url = image1_account_s3_image_public_url
    account_image.s3_object_name = file_name
    account_image.save!
    self.send(image1_account_s3_image_public_url_column + "=", account_image.id)
    self.save!
  end

  def resource_image1_public_url
    return nil if resource_image1_account_s3_image_id.blank?
    AccountS3Image.find(self.resource_image1_account_s3_image_id)&.s3_object_public_url
  end

  def selected_shop_ids
    shop_resources.pluck(:shop_id)
  end

  def selected_reserve_frame_ids
    reserve_frame_resources.pluck(:reserve_frame_id)
  end

  def resource_type_text
    return '設備・備品' if self.Equipment?
    return 'スタッフ' if self.Staff?
  end
end
