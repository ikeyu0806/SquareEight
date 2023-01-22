class Shop < ApplicationRecord
  include PublicIdModule
  include Base64Image

  belongs_to :account

  has_many :shop_monthly_payment_plans
  has_many :monthly_pament_plans, through: :shop_monthly_payment_plans
  has_many :shop_products
  has_many :products, through: :shop_products
  has_many :shop_reserve_frames
  has_many :reserve_frames, through: :shop_reserve_frames
  has_many :shop_ticket_masters
  has_many :ticket_masters, through: :shop_ticket_masters
  has_many :shop_webpages
  has_many :webpages, through: :shop_webpages

  # S3にputするファイルとs3_object_public_url_column
  def register_s3_image(image_file, s3_object_public_url_column)
    file_name = "shop_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
    s3_object_public_url = put_s3_http_request_form_data(image_file, ENV["PRODUCT_IMAGE_BUCKET"], file_name)
    account_image = AccountS3Image.new
    account_image.account = self.account
    account_image.s3_object_public_url = s3_object_public_url
    account_image.s3_object_name = file_name
    account_image.save!
    self.send(s3_object_public_url_column + "=", account_image.id)
    self.save!
  end

  def page_cover_slide1_image_public_url
    AccountS3Image.find(self.page_cover_slide1_account_s3_image_id).s3_object_public_url
  end

  def page_cover_slide2_image_public_url
    AccountS3Image.find(self.page_cover_slide2_account_s3_image_id).s3_object_public_url
  end

  def page_cover_slide3_image_public_url
    AccountS3Image.find(self.page_cover_slide3_account_s3_image_id).s3_object_public_url
  end

  def brand_image_public_url
    AccountS3Image.find(self.brand_image_account_s3_image_id).s3_object_public_url
  end

  def shop_image1_public_url
    AccountS3Image.find(self.shop_image1_account_s3_image_id).s3_object_public_url
  end

  def shop_image2_public_url
    AccountS3Image.find(self.shop_image2_account_s3_image_id).s3_object_public_url
  end

  def shop_image3_public_url
    AccountS3Image.find(self.shop_image3_account_s3_image_id).s3_object_public_url
  end
end
