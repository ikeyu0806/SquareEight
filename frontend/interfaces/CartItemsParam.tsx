export interface CartItemsParam {
  cart_items: ProductCartItemParam[] | TicketMasterCartItemParam[] | MoonthlyPaymentPlanCartItemParam[]
}

export interface ProductCartItemParam {
  id: string
  quantity: number
  product_name: string
  price: number
  tax_rate: number
  product_type: string
  s3_object_public_url: string
}


export interface TicketMasterCartItemParam {
  id: string
  product_name: string
  issue_number: number
  price: number
  effective_month: number
  product_type: string
  s3_object_public_url: string
}


export interface MoonthlyPaymentPlanCartItemParam {
  id: string
  product_name: string
  price: number
  effective_month: number
  reserve_interval_text: string
  s3_object_public_url: string
}
