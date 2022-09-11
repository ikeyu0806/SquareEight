export interface ProductParam {
  id: string
  name: string
  description: string
  price: number
  tax_rate: number
  inventory: number
  s3_object_public_url: number
  show_product_type_form: boolean
  product_types: ProductType[]
}

export interface ProductType {
  name: string
  inventory: number
}
