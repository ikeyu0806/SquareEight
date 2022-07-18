export interface TicketMasterParam {
  id: number
  name: string
  issue_number: number
  price: number
  description: string
  s3_object_public_url?: string
}
