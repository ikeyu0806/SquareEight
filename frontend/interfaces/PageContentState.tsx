
import { ExternalLinkBlockStateType } from './ExternalLinkBlockStateType'
import { TextImageBlockStateType } from './TextImageBlockStateType'
import { HeadingBlockState } from './HeadingBlockState'
import { ImageSlideState } from './ImageSlideState'

export type PageContentState = {
  blockID: number
  blockType: string
  blockState: ExternalLinkBlockStateType | TextImageBlockStateType | HeadingBlockState | ImageSlideState
  sortOrder: number
}
