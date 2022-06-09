class MerchantUser < ApplicationRecord
  has_secure_password

  belongs_to :account

  enum authentication_status: { Disabled: 0, Enabled: 1 }
  enum authority_category: { SystemAdmin: 0, MerchantAdmin: 1, Staff: 2 }
end
