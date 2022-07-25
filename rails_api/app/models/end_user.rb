class EndUser < ApplicationRecord
  has_secure_password(validations: false)

  has_many :orders
end
