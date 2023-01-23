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
  page_cover_slide1_image_public_url: string
  page_cover_slide2_image_public_url: string
  page_cover_slide3_image_public_url: string
  brand_image_public_url: string
  shop_image1_public_url: string
  shop_image2_public_url: string
  shop_image3_public_url: string
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
