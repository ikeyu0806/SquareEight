import { PageContentState } from './PageContentState'
import { WebsiteHeaderType } from './WebsiteHeaderType'
import { WebsiteFooterType } from './WebsiteFooterType'
export interface WebpageParam {
  id: number
  tag: string
  path: string
  content: string
  is_top_page: boolean
  block_contents: PageContentState[]
  header_json?: WebsiteHeaderType
  footer_json?: WebsiteFooterType
}
