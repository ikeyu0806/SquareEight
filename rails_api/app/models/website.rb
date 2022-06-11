class Website < ApplicationRecord
  belongs_to :account
  has_many :webpages
end
