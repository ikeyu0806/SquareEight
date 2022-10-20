import { MultiPaymentMethod } from './MultiPaymentMethod'
export interface ReservationParam {
  public_id: string
  id: string
  representative_first_name: string
  representative_last_name: string
  number_of_people: number
  price: number
  payment_method: string
  reserve_frame_title: string
  display_reservation_datetime: string
  display_payment_method: string
  display_status: string
  ticket_master_name: string
  monthly_payment_plan_name: string
  ticket_consume_number: number
  customer_name: string
  customer_email: string
  customer_phone_number: string
  status: string
  reception_type: string
  viewable_key: string
  questionnaire_master_id: number
  reservation_local_payment_prices: MultiPaymentMethod[]
  reservation_credit_card_payment_prices: MultiPaymentMethod[]
}
