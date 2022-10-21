export interface TicketMasterParam {
  public_id: string
  id: number
  name: string
  issue_number: number
  price: number
  effective_month: number
  description: string
  publish_status: string
  s3_object_public_url?: string
}
