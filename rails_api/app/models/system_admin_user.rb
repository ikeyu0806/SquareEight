class SystemAdminUser < ApplicationRecord
  include PublicIdModule

  has_secure_password
end
