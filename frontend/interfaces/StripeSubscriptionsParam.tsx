export interface StripeSubscriptionsParam {
  amount: number
  application_fee_amount: number
  metadata: StripeSubscriptionsParamMetaData
}

export interface StripeSubscriptionsParamMetaData {
  account_business_name: string
  name: string
}
