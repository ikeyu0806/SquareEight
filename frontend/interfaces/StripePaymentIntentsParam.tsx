export interface StripePaymentIntentsParam {
  public_id: string
  amount: number
  application_fee_amount: number
  purchase_product_name: string
  order_date: string
  customer_fullname: string
  system_plan_name: string
  account_business_name: string
  product_label_text: string
  refund_at_text: string
  quantity: string
  system_stripe_subscription_join_datetext: string
}
