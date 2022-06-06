class MerchantUser < ApplicationRecord
  has_secure_password

  enum authentication_status: { Disabled: 0, Enabled: 1 }
end
