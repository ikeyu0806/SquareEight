export interface ReserveFrameParam {
  start_at?: string
  end_at?: string
  title: string
  description: string
  capacity: number
  local_payment_price?: string
  publish_status: string
  payment_methods_text?: string[]
}
