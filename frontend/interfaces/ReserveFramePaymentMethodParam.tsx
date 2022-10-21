export interface ReserveFramePaymentMethodParam {
  local_payment_price?: number
  credit_card_payment_price? :number
  enable_monthly_payment_plans?: EnableMonthlyPaymentPlanParam[]
  enable_tickets?: EnableTicketParam[]
}

interface EnableTicketParam {
  public_id: string
  id: number
  ticket_name: string
  consume_number: number
}

interface EnableMonthlyPaymentPlanParam {
  public_id: string
  id: number
  monthly_payment_plan_name: string
}
