export interface ProductParam {
  public_id: string
  id: string
  name: string
  description: string
  price: number
  tax_rate: number
  inventory: number
  inventory_allocation: number
  image1_account_s3_image_public_url: string
  show_product_type_form: boolean
  publish_status: string
  product_types: ProductType[]
  delivery_datetime_target_flg: boolean
}

export interface ProductType {
  public_id: string
  name: string
  inventory: number
  inventory_allocation: number
}
