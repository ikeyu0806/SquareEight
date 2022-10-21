export interface CartItemParam {
  public_id: string
  id: string
  quantity: number
  product_name: string
  price: number
  tax_rate: number
  effective_month: number
  issue_number: number
  s3_object_public_url: string
  reserve_interval_text: string
  item_type: string
  business_name: string
  is_expired: boolean
  show_type: boolean
  selected_type_name: string
  remaining_inventory: number
  delivery_charge_type: string
  delivery_charge: number
  delivery_datetime_target_flg: boolean
  shippable_date: string[]
  shippable_time: string[]
}
