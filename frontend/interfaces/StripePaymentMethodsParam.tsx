import { StripeCardParam } from "./StripeCardParam"

export interface StripePaymentMethodsParam {
  public_id: string
  id: string
  card: StripeCardParam
}
