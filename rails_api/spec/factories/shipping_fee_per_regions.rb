FactoryBot.define do
  factory :shipping_fee_tokyo, class: ShippingFeePerRegion do
    region { '東京都' }
    shipping_fee { 100 }
  end
end
