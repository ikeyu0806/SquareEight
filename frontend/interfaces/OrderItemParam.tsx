export interface OrderItemParam {
  product_type: string
  product_name: string
  business_name: string
  price: number
  commission: number
  quantity: number
  // product_typeは回数券、物販とか。
  // これは物販の在庫種別。TODO:ややこしいのでなんとかしたい
  product_type_name: string
}
