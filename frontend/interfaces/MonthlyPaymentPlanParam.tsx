export interface MonthlyPaymentPlanParam {
  name: string
  price: number
  reserve_is_unlimited: boolean
  reserve_interval_number: number
  reserve_interval_unit: string 
  enable_reserve_count: number
}
