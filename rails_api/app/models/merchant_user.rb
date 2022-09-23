class MerchantUser < ApplicationRecord
  has_secure_password(validations: false)

  belongs_to :account
  has_many :reservations, through: :account

  enum email_authentication_status: { Disabled: 0, Enabled: 1 }
  enum authority_category: { SystemAdmin: 0, MerchantAdmin: 1, Staff: 2 }

  validates :authority_category, presence: true
  validates :password, password: true

  def stripe_account_enable
    account.stripe_account_id.present?
  end

  def stripe_customer_enable
    account.stripe_customer_id.present?
  end
end
