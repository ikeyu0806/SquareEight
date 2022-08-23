class Customer < ApplicationRecord
  has_many :orders

  def full_name
    full_name = ((self.last_name || '') + (self.first_name || ''))
    full_name.blank? ? '名前が登録されていません' : full_name
  end
end
