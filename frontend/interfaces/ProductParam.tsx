export interface ProductParam {
  id: string
  name: string
  description: string
  price: number
  tax_rate: number
  inventory: number
  s3_object_public_url: number
  show_product_type_form: boolean
  publish_status: string
  product_types: ProductType[]
  delivery_datetime_target_flg: boolean
}

export interface ProductType {
  name: string
  inventory: number
}
