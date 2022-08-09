class MonthlyPaymentPlan < ApplicationRecord
  enum reserve_interval_unit: { Day: 0, Week: 1 }
  belongs_to :account
  has_many :cart_monthly_payment_plans

  def reserve_interval_unit_text
    case self.reserve_interval_unit
    when 'Day'
      '日'
    when 'Week'
      '週'
    when 'Month'
      '月'
    else
      raise
    end
  end

  def plan_text
    if reserve_is_unlimited
      name + ": 予約数無制限"
    else
      name + " " + reserve_interval_number.to_s + reserve_interval_unit_text + "辺り" + enable_reserve_count.to_s + "回予約可能"
    end
  end

  def delete_s3_image
    client = Aws::S3::Client.new(
      access_key_id: ENV['AWS_ACCESS_KEY'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: "ap-northeast-1"
    )
    client.delete_object(bucket: ENV["PRODUCT_IMAGE_BUCKET"], key: self.s3_object_name)
  end
end
