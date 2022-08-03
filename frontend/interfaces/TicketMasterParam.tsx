export interface TicketMasterParam {
  id: number
  name: string
  issue_number: number
  price: number
  effective_month: number
  description: string
  s3_object_public_url?: string
}
