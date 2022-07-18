export interface MonthlyPaymentPlanParam {
  id: number
  name: string
  price: number
  reserve_is_unlimited: boolean
  reserve_interval_number: number
  reserve_interval_unit: string 
  enable_reserve_count: number
  description: string
  s3_object_public_url?: string
}
