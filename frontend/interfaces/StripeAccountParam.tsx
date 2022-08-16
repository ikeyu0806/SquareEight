import { StripeExternalAccountParam } from "./StripeExternalAccountParam"
import { StripeIndividualAccountParam } from "./StripeIndividualAccountParam"
import { StripeCompanyAccountParam } from "./StripeCompanyAccountParam"

export interface StripeAccountParam {
  business_type: string
  business_url: string
  product_description: string
  display_name: string
  email: string
  charges_enabled?: boolean
  payouts_enabled: boolean
  external_accounts?: StripeExternalAccountParam
  individual: StripeIndividualAccountParam
  legal_entity: StripeIndividualAccountParam
  company: StripeCompanyAccountParam
  business_profile: BusinessProfile
  requirements: StripeAccountRequirementsParams
}

interface BusinessProfile {
  name: string
  product_description: string
  url: string
}

interface StripeAccountRequirementsParams {
  currently_due: string[]
}
