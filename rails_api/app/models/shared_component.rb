class SharedComponent < ApplicationRecord
  include PublicIdModule
  include Base64Image

  belongs_to :account

  def navbar_image_account_s3_image_public_url
    return nil if navbar_image_account_s3_image_id.blank?
    account_image = AccountS3Image.find(self.navbar_image_account_s3_image_id)
    AccountS3Image.find(self.navbar_image_account_s3_image_id).s3_object_public_url
  end

  def register_navbar_image(image_file)
    file_name = "shared_component_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
    navbar_image_account_s3_image_public_url = put_s3_http_request_form_data(image_file, ENV["PRODUCT_IMAGE_BUCKET"], file_name)
    account_image = AccountS3Image.new
    account_image.account = self.account
    account_image.s3_object_public_url = navbar_image_account_s3_image_public_url
    account_image.s3_object_name = file_name
    account_image.save!
    self.navbar_image_account_s3_image_id = account_image.id
    self.save!
  end
end
