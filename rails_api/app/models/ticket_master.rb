class TicketMaster < ApplicationRecord
  belongs_to :account
  has_many :purchased_tickets
  has_many :cart_ticket_masters
  has_many :ticket_master_image_relations
  has_many :account_s3_images, through: :ticket_master_image_relations

  enum publish_status: { Unpublish: 0, Publish: 1 }

  scope :enabled, -> { where(deleted_at: nil) }

  def delete_s3_image
    client = Aws::S3::Client.new(
      access_key_id: ENV['AWS_ACCESS_KEY'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: "ap-northeast-1"
    )
    client.delete_object(bucket: ENV["PRODUCT_IMAGE_BUCKET"], key: self.s3_object_name)
  end

  def logical_delete
    update!(deleted_at: Time.zone.now)
  end

  def main_image_public_url
    ticket_master_image_relations.find_by(relation_status: "Main")&.account_s3_image&.s3_object_public_url
  end
end
