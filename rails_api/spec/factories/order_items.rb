FactoryBot.define do
  factory :product_order_item, class: OrderItem do
    item_type { 'Product' }
    product_name { 'product_demo' }
    price { 1000 }
    commission { 60 }
    quantity { 1 }
    delivery_charge { 0 }
    delivery_date_text { '指定なし' }
  end

  factory :monthly_payment_plan_order_item, class: OrderItem do
    item_type { 'MonthlyPaymentPlan' }
    product_name { 'monthly_payment_plan_demo' }
    price { 1000 }
    commission { 60 }
    quantity { 1 }
  end

  factory :ticket_master_order_item, class: OrderItem do
    item_type { 'TicketMaster' }
    product_name { 'ticket_master_demo' }
    price { 1000 }
    commission { 60 }
    quantity { 1 }
  end
end
