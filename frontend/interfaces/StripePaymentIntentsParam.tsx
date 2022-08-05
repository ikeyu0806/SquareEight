export interface StripePaymentIntentsParam {
  amount: number
  application_fee_amount: number
  metadata: StripePaymentIntentsMetaData
}

export interface StripePaymentIntentsMetaData {
  account_business_name: string
  name: string
  order_date: string
}
