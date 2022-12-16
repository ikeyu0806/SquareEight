export interface HtmlMailTemplate {
  templateType: string
  content: ImageWithTextTemplateContent[] | ImageWithTextListTypeTemplateContent[]
}

export interface ImageWithTextTemplateContent {
  text?: string
  image?: any
  base64Image?: any
}

export interface ImageWithTextListTypeTemplateContent {
  text?: string
  image?: any
  base64Image?: any
}
