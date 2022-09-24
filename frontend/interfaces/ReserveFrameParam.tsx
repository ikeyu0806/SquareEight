import { ReserveFrameReceptionTimeParam } from './ReserveFrameReceptionTimeParam'
import { MultiPaymentMethod } from './MultiPaymentMethod'
export interface ReserveFrameParam {
  id: string
  start_at: string
  end_at: string
  display_start_at: string
  display_end_at: string
  title: string
  description: string
  capacity: number
  is_set_price: string
  local_payment_price: string
  publish_status: string
  reception_type: string
  reception_phone_number: string
  repeat_setting_text :string
  reception_type_text: string
  payment_methods_text: string[]
  s3_object_public_url: string
  reserve_frame_reception_times_values: ReserveFrameReceptionTimeParam[]
  reserve_frame_local_payment_prices: MultiPaymentMethod[]
  reserve_frame_credit_card_payment_prices: MultiPaymentMethod[]
}
