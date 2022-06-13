import { PageContentState } from './PageContentState'
import { blockStateType } from './PageContentState'
export interface WebpageParam {
  id: number
  tag: string
  path: string
  content: string
  block_contents: blockStateType
}
