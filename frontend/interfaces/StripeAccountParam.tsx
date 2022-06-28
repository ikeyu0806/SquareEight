import { StripeExternalAccountParam } from "./StripeExternalAccountParam"
import { StripeIndividualAccountParam } from "./StripeIndividualAccountParam"

export interface StripeAccountParam {
  business_url: string
  product_description: string
  display_name: string
  email: string
  external_accounts?: StripeExternalAccountParam
  legal_entity: StripeIndividualAccountParam
}
