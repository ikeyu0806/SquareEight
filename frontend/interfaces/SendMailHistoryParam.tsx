import { ImageWithTextListTypeTemplateContent, ImageWithTextTemplateContent } from 'interfaces/HtmlMailTemplate'
export interface SendMailHistoryParam {
  customer_name: string
  email: string
  mail_title: string
  message_body: string
  message_type: string
  send_at: string
  customer_fullname: string
  html_template_type: string
  parsed_message_body: ImageWithTextListTypeTemplateContent[] | ImageWithTextTemplateContent[]
}
