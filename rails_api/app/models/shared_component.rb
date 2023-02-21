class SharedComponent < ApplicationRecord
  include PublicIdModule

  belongs_to :account

  def navbar_image_account_s3_image_public_url
    return nil if navbar_image_account_s3_image_id.blank?
    account_image = AccountS3Image.find(self.navbar_image_account_s3_image_id)
    AccountS3Image.find(self.navbar_image_account_s3_image_id).s3_object_public_url
  end
end
