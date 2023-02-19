export interface OrderItemParam {
  public_id: string
  id: string
  item_type: string
  product_name: string
  business_name: string
  price: number
  commission: number
  quantity: number
  product_type_name: string
  address: string
  postal_code: string
  order_name: string
  shipped: boolean
  delivery_charge: number
  delivery_date_text: string
  product_inventory?: number
  product_inventory_allocation?: number
  product_type_inventory?: number
  product_type_inventory_allocation?: number
  is_product_type_exists: boolean
  end_user_name: string
  customer_public_id: string
}
