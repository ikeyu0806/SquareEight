export interface OrderParam {
  id: number
  total_price: number
  total_commission: number
  product_names: string[]
  order_date: string
  name: string
  address: string
  postal_code: string
  include_product: boolean
}
