export interface CartItemParam {
  id: string
  quantity: number
  product_name: string
  price: number
  tax_rate: number
  effective_month: number
  issue_number: number
  s3_object_public_url: string
  reserve_interval_text: string
  type: string
  business_name: string
  is_expired: boolean
  show_type: boolean
  selected_type_name: string
}
