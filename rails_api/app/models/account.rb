class Account < ApplicationRecord
  has_one :business_hour
  has_many :merchant_users
  has_many :websites
  has_many :payment_methods
  has_many :ticket_masters
  has_many :monthly_payment_plans
  has_many :resources
end
