class MessageTemplate < ApplicationRecord
  belongs_to :account

  validates :name, presence: true
  validates :content, presence: true

  def self.convert_content(content, last_name='', first_name='', price='', payment_request_url='')
    content
    .gsub(/%customer_name/, last_name + first_name)
    .gsub(/%price/, price)
    .gsub(/%payment_request_url/, payment_request_url)
  end
end
