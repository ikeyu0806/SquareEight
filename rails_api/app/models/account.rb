class Account < ApplicationRecord
  has_one :business_hour
  has_many :merchant_users
  has_many :websites
  has_many :payment_methods
  has_many :ticket_masters
  has_many :monthly_payment_plans
  has_many :resources
  has_many :reserve_frames

  def reserve_calendar_json
    result = []
    self.reserve_frames.each do |frame|
      if frame.is_repeat
        
      else
        result << {
          start: frame.start_at,
          title: frame:title,
          id: frame.id
        }
      end
    end
    result
  end
end
