class MessageTemplate < ApplicationRecord
  belongs_to :account

  validates :name, presence: true
  validates :content, presence: true

  def self.convert_content(content, last_name='', first_name='', price='', payment_request_url='')
    last_name = '' if last_name.nil?
    first_name = '' if first_name.nil?
    price = 0 if price.nil?
    payment_request_url = '' if payment_request_url.nil?
    content
    .gsub(/%customer_name/, last_name + first_name)
    .gsub(/%price/, price.to_s)
    .gsub(/%payment_request_url/, payment_request_url)
  end
end
