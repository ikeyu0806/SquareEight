export interface MerchantStripeSubscription {
  public_id: string
  id: number
  account_business_name: string
  canceled_at: string
  monthly_payment_plan_name: string
  monthly_payment_plan_id: number
  billing_cycle_anchor_day: number
  canceled_at_text: string
  joined_date_text: string
  monthly_payment_plan_public_id: string
}
