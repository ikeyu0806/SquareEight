import { PageContentState } from "./PageContentState"
export interface WebpageParam {
  id: number
  tag: string
  path: string
  content: string
  content_json?: PageContentState[]
}
