export interface MonthlyPaymentPlanParam {
  public_id: string
  id: number
  name: string
  price: number
  reserve_is_unlimited: boolean
  reserve_interval_number: number
  reserve_interval_unit: string 
  enable_reserve_count: number
  description: string
  publish_status: string
  image1_account_s3_image_public_url: string
}
