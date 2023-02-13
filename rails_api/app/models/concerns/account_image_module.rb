module AccountImageModule
  extend ActiveSupport::Concern

  def image1_account_s3_image_public_url
    return nil if image1_account_s3_image_id.blank?
    account_image = AccountS3Image.find(self.image1_account_s3_image_id)
    AccountS3Image.find(self.image1_account_s3_image_id).s3_object_public_url
  end

  def image2_account_s3_image_public_url
    return nil if image2_account_s3_image_id.blank?
    account_image = AccountS3Image.find(self.image2_account_s3_image_id)
    AccountS3Image.find(self.image2_account_s3_image_id).s3_object_public_url
  end

  def image3_account_s3_image_public_url
    return nil if image3_account_s3_image_id.blank?
    account_image = AccountS3Image.find(self.image3_account_s3_image_id)
    AccountS3Image.find(self.image3_account_s3_image_id).s3_object_public_url
  end

  def image4_account_s3_image_public_url
    return nil if image4_account_s3_image_id.blank?
    account_image = AccountS3Image.find(self.image4_account_s3_image_id)
    AccountS3Image.find(self.image4_account_s3_image_id).s3_object_public_url
  end

  def image5_account_s3_image_public_url
    return nil if image5_account_s3_image_id.blank?
    account_image = AccountS3Image.find(self.image5_account_s3_image_id)
    AccountS3Image.find(self.image5_account_s3_image_id).s3_object_public_url
  end

  def register_s3_image(file_name, image_file, account_image_id_column_name)
    image1_account_s3_image_public_url = put_s3_http_request_form_data(image_file, ENV["PRODUCT_IMAGE_BUCKET"], file_name)
    account_image = AccountS3Image.new
    account_image.account = self.account
    account_image.s3_object_public_url = image1_account_s3_image_public_url
    account_image.s3_object_name = file_name
    account_image.save!
    self.send(account_image_id_column_name + "=", account_image.id)
    self.save!
  end
end
