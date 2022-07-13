export interface ReserveFramePaymentMethodParam {
  local_payment_price?: number
  enable_monthly_payment_plans?: EnableMonthlyPaymentPlanParam[]
  enable_tickets?: EnableTicketParam[]
}

interface EnableTicketParam {
  ticket_name: string
  consume_number: number
}

interface EnableMonthlyPaymentPlanParam {
  monthly_payment_plan_name: string
}
