
import { ExternalLinkBlockStateType } from '../types/ExternalLinkBlockStateType'
import { TextImageBlockStateType } from '../types/TextImageBlockStateType'
import { HeadingBlockState } from '../types/HeadingBlockState'
import { ImageSlideState } from '../types/ImageSlideState'

export type PageContentState = {
  blockID: string
  blockType: string
  blockState: blockStateType
  sortOrder: number
}

export type blockStateType = ExternalLinkBlockStateType | TextImageBlockStateType | HeadingBlockState | ImageSlideState
