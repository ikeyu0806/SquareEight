import { StripeCardParam } from "./StripeCardParam"

export interface StripePaymentMethodsParam {
  id: string
  card: StripeCardParam
}
