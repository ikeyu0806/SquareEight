
import { ExternalLinkBlockStateType } from './ExternalLinkBlockStateType'
import { TextImageBlockStateType } from './TextImageBlockStateType'
import { HeadingBlockState } from './HeadingBlockState'
import { ImageSlideState } from './ImageSlideState'

export type PageContentState = {
  blockID: string
  blockType: string
  blockState: blockStateType
  sortOrder: number
}

export type blockStateType = ExternalLinkBlockStateType | TextImageBlockStateType | HeadingBlockState | ImageSlideState
