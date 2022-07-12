export interface ReserveFramePaymentMethodParam {
  local_payment_price: number
  enable_monthly_payment_plans: string[]
  enable_tickets: EnableTicketParam[]
}

interface EnableTicketParam {
  ticket_name: string
  consume_number: number
}
