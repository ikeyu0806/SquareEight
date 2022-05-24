
import { ExternalLinkBlockStateType } from "./ExternalLinkBlockStateType"
import { TextImageBlockStateType } from "./TextImageBlockStateType"
import { HeadingBlockState } from "./HeadingBlockState"

export type PageContentState = {
  blockType: string
  blockState: ExternalLinkBlockStateType | TextImageBlockStateType | HeadingBlockState
}
