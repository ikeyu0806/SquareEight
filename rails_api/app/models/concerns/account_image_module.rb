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
end
