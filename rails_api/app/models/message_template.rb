class MessageTemplate < ApplicationRecord
  belongs_to :account

  validates :name, presence: true
  validates :content, presence: true
end
