import { StripeExternalAccountParam } from "./StripeExternalAccountParam"
import { StripeIndividualAccountParam } from "./StripeIndividualAccountParam"

export interface StripeAccountParam {
  business_url: string
  display_name: string
  email: string
  external_accounts?: StripeExternalAccountParam[]
  legal_entity: StripeIndividualAccountParam
}
