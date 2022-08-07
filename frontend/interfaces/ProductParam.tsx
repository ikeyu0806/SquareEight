export interface ProductParam {
  name: string
  price: number
  tax_rate: number
  inventory: number
  description: number
  s3_object_public_url: number
  product_types: ProductType[]
}

export interface ProductType {
  name: string
  inventory: number
}
