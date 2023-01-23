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

  # S3にputするファイルとimage1_account_s3_image_public_url_column
  def register_s3_image(image_file, image1_account_s3_image_public_url_column)
    file_name = "shop_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
    image1_account_s3_image_public_url = put_s3_http_request_form_data(image_file, ENV["PRODUCT_IMAGE_BUCKET"], file_name)
    account_image = AccountS3Image.new
    account_image.account = self.account
    account_image.s3_object_public_url = image1_account_s3_image_public_url
    account_image.s3_object_name = file_name
    account_image.save!
    self.send(image1_account_s3_image_public_url_column + "=", account_image.id)
    self.save!
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

  def shop_image4_public_url
    AccountS3Image.find(self.shop_image4_account_s3_image_id).s3_object_public_url
  end

  def shop_image5_public_url
    AccountS3Image.find(self.shop_image5_account_s3_image_id).s3_object_public_url
  end

  def shop_image6_public_url
    AccountS3Image.find(self.shop_image6_account_s3_image_id).s3_object_public_url
  end

  def reserve_frames_info
    result = []
    reserve_frames.Publish.each do |r|
      content = {}
      content[:title] = r.title
      content[:description] = r.description
      content[:image1_public_url] = AccountS3Image.find(r.image1_account_s3_image_id).s3_object_public_url
      content[:url] = '/reserve_frame/' + r.public_id + '/calendar'
      result.push(content)
    end
    result
  end
end
