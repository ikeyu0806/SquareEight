export interface StripeCompanyAccountParam {
  phone: string
  name: string
  address_kanji: AddressParam
  address_kana: AddressParam

}

interface AddressParam {
  postal_code: string
  state: string
  city: string
  town: string
  line1: string
  line2: string
}
