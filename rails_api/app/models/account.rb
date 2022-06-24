class Account < ApplicationRecord
  has_many :merchant_users
  has_many :websites
  has_many :payment_methods
  has_many :ticket_masters
end
