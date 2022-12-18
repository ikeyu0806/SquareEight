export interface HtmlMailTemplate {
  templateType: string
  content: ImageWithTextTemplateContent[] | ImageWithTextListTypeTemplateContent[]
}


export interface ImageWithTextTemplateContent {
  text?: string
  image?: any
  blockID: string
  sortOrder: number
}

export interface ImageWithTextListTypeTemplateContent {
  text?: string
  image?: any
  blockID: string
  sortOrder: number
}
