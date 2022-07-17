export interface ReserveFrameParam {
  start_at?: string
  end_at?: string
  display_start_at?: string
  display_end_at?: string
  title: string
  description: string
  capacity: number
  local_payment_price?: string
  publish_status: string
  repeat_setting_text? :string
  payment_methods_text?: string[]
}
