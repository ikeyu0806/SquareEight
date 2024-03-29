import { ImageWithTextListTypeTemplateContent, ImageWithTextTemplateContent } from 'interfaces/HtmlMailTemplate'
export interface SendMailScheduleParam {
  public_id: string
  email: string
  mail_title: string
  message_body: string
  message_template_type: string
  html_template_type: string
  scheduled_datetime: string
  display_scheduled_datetime: string
  customer_fullname: string
  past_flg: boolean
  parsed_message_body: ImageWithTextListTypeTemplateContent[] | ImageWithTextTemplateContent[]
  send_status: string
}
