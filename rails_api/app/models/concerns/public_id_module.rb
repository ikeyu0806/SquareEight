module PublicIdModule
  require 'securerandom'

  extend ActiveSupport::Concern

  included do
    before_create :set_public_id
  end

  def set_public_id
    while self.public_id.blank? || self.class.find_by(public_id: self.public_id).present? do
      self.public_id = SecureRandom.uuid
    end
  end
end
