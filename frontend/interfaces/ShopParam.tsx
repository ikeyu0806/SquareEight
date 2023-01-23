export interface ShopParam {
  id: number
  public_id: string
  name: string
  description1: string
  description2: string
  postal_code: string
  state: string
  city: string
  town: string
  line1: string
  line2: string
  access_info: string
  remarks: string
  shop_image1_public_url: string
  shop_image2_public_url: string
  shop_image3_public_url: string
  shop_image4_public_url: string
  shop_image5_public_url: string
  shop_image6_public_url: string
}

export interface ReserveFrameInfo {
  title: string
  description: string
  image1_public_url: string
  url: string
}

export interface MonthlyPatmentPlanInfo {
  name: string
  description: string
  image1_public_url: string
  price: number
  reserve_is_unlimited: boolean
  reserve_interval_number: number
  enable_reserve_count: number
  url: string
}

export interface TicketMasterInfo {
  name: string
  description: string
  image1_public_url: string
  price: number
  issue_number: number
  effective_month: number
  url: string
}

export interface ProductInfo {
  name: string
  description: string
  image1_public_url: string
  price: number
  tax_rate: number
  url: string
}
