module AccountImage1Module
  extend ActiveSupport::Concern

  def image1_account_s3_image_public_url
    return nil if image1_account_s3_image_id.blank?
    account_image = AccountS3Image.find(self.image1_account_s3_image_id)
    AccountS3Image.find(self.image1_account_s3_image_id).s3_object_public_url
  end
end
