require 'securerandom'

class MerchantUser < ApplicationRecord
  include PublicIdModule

  has_secure_password(validations: false)

  belongs_to :account
  has_many :reservations, through: :account
  has_many :customers, through: :account

  enum email_authentication_status: { Disabled: 0, Enabled: 1 }
  enum authority_category: { RootUser: 0, CommonUser: 1 }

  validates :authority_category, presence: true
  validates :password, password: true

  def stripe_account_enable
    account.stripe_account_id.present?
  end

  def set_email_reset_key
    email_reset_key = SecureRandom.hex(10)
    self.update!(email_reset_key: email_reset_key)
  end

  def stripe_customer_enable
    account.stripe_customer_id.present?
  end

  def is_enabled_email_login
    return true if email.present? && password_digest.present?
    return false
  end
end
