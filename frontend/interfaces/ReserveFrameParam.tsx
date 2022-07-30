export interface ReserveFrameParam {
  id: string
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
  reception_type_text?: string
  payment_methods_text?: string[]
  s3_object_public_url?: string
}
