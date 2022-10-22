FactoryBot.define do
  factory :product, class: Product do
    name { 'demo_product' }
    price { 1000 }
    tax_rate { 10 }
    flat_rate_delivery_charge { 100 }
    inventory { 100 }
    publish_status { 'Publish' }
    delivery_charge_type { 'noSetting' }
    delivery_charge_with_order_number { 'nationwideUniform' }
  end
end
