import { LineUserParam } from './LineUserParam'
export interface CustomerParam {
  public_id: string
  id: number
  first_name: string
  last_name: string
  first_name_kana: string
  last_name_kana: string
  email: string
  phone_number: string
  notes: string
  full_name: string
  line_display_name: string
  line_picture_url: string
  line_user_public_id: string
  line_user: LineUserParam
}
