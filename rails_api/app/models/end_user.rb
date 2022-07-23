class EndUser < ApplicationRecord
  has_secure_password

  has_many :orders

  validates :email, presence: true
end
