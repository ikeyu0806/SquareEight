export interface MerchantStripeSubscriptionParam {
  public_id: string
  customer_public_id: string
  customer_full_name: string
  billing_cycle_anchor_day: number
  canceled_at_text: string
  joined_date_text: string
  monthly_payment_plan_public_id: string
  price: number
}
