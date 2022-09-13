class TicketMaster < ApplicationRecord
  belongs_to :account
  has_many :purchased_tickets
  has_many :cart_ticket_masters

  enum publish_status: { Unpublish: 0, Publish: 1 }

  def delete_s3_image
    client = Aws::S3::Client.new(
      access_key_id: ENV['AWS_ACCESS_KEY'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: "ap-northeast-1"
    )
    client.delete_object(bucket: ENV["PRODUCT_IMAGE_BUCKET"], key: self.s3_object_name)
  end
end
