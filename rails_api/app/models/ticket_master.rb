class TicketMaster < ApplicationRecord
  include PublicIdModule
  include AccountImageModule

  belongs_to :account
  has_many :purchased_tickets
  has_many :cart_ticket_masters
  has_many :shop_ticket_masters, dependent: :destroy
  has_many :reserve_frame_ticket_masters, dependent: :destroy

  enum publish_status: { Unpublish: 0, Publish: 1 }

  scope :enabled, -> { where(deleted_at: nil) }

  validates :name, presence: true
  validates :effective_month, presence: true

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

  def selected_shop_ids
    shop_ticket_masters.pluck(:shop_id)
  end

  def selected_reserve_frame_ids
    reserve_frame_ticket_masters.pluck(:reserve_frame_id)
  end
end
