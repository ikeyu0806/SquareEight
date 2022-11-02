import { ReserveFrameReceptionTimeParam } from './ReserveFrameReceptionTimeParam'
import { MultiPaymentMethod } from './MultiPaymentMethod'
import { ResourceParam } from './ResourceParam'
import { QuestionnaireMasterParam } from './QuestionnaireMasterParam'
import { UnreservableFrameParam } from './UnreservableFrameParam'

export interface ReserveFrameParam {
  public_id: string
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
  is_repeat: boolean
  is_repeat_sun: boolean
  is_repeat_mon: boolean
  is_repeat_tue: boolean
  is_repeat_wed: boolean
  is_repeat_thu: boolean
  is_repeat_fri: boolean
  is_repeat_sat: boolean
  reception_start_day_before: number
  repeat_interval_type: string
  payment_methods_text: string[]
  s3_object_public_url: string
  is_accept_cancel: boolean
  is_accept_cancel_on_the_day: boolean
  cancel_reception_day_before: number
  cancel_reception_hour_before: number
  reception_deadline_text: string
  cancel_reception_text: string
  reserve_frame_reception_times_values: ReserveFrameReceptionTimeParam[]
  reserve_frame_local_payment_prices: MultiPaymentMethod[]
  reserve_frame_credit_card_payment_prices: MultiPaymentMethod[]
  resources_name_with_public_id: ResourceParam[]
  questionnaire_master_title_with_public_id: QuestionnaireMasterParam
  unreservable_frames_datetimes: UnreservableFrameParam[]
  out_of_range_frames_datetimes: UnreservableFrameParam[]
}
