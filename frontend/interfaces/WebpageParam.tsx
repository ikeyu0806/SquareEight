import { PageContentState } from './PageContentState'
export interface WebpageParam {
  id: number
  tag: string
  path: string
  content: string
  is_top_page: boolean
  block_contents: PageContentState[]
}
