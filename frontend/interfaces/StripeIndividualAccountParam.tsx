import { StripeAddressParam } from "./StripeAddressParam"
import { StripeDobParam } from "./StripeDobParam"
import { StripeVerificationParam } from "./StripeVerificationParam"

export interface StripeIndividualAccountParam {
  first_name: string
  last_name: string
  first_name_kana: string
  last_name_kana: string
  personal_email: string
  personal_phone_number: string
  type?: string
  gender: string
  product_description: string
  personal_address_kanji: StripeAddressParam
  personal_address_kana: StripeAddressParam
  address_kanji: StripeAddressParam
  address_kana: StripeAddressParam
  dob: StripeDobParam
  verification: StripeVerificationParam
}
