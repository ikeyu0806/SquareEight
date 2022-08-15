import { StripeAddressParam } from './StripeAddressParam';
import { StripeDobParam } from './StripeDobParam';
export interface StripePersonParam {
  first_name_kanji: string
  first_name_kana: string
  last_name_kanji: string
  last_name_kana: string
  phone: string
  email: string
  gender: string
  address_kanji: StripeAddressParam
  address_kana: StripeAddressParam
  dob: StripeDobParam
}
