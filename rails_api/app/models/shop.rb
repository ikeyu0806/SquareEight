class Shop < ApplicationRecord
  include Base64Image

  belongs_to :account

  # S3にputするファイルとs3_object_public_url_column
  def register_s3_image(image_file, s3_object_public_url_column)
    file_name = "shop_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
    s3_object_public_url = put_s3_http_request_base64_data(image_file, ENV["PRODUCT_IMAGE_BUCKET"], file_name)
    account_image = AccountS3Image.new
    account_image.account = current_merchant_user.account
    account_image.s3_object_public_url = s3_object_public_url
    account_image.s3_object_name = file_name
    account_image.save!
    self.send(s3_object_public_url_column + "=", account_image.id)
    self.save!
  end
end
