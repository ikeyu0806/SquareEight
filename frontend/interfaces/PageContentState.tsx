
import { ExternalLinkBlockStateType } from "./ExternalLinkBlockStateType"
import { TextImageBlockStateType } from "./TextImageBlockStateType"

export type PageContentState = {
  blockType: string
  blockState: ExternalLinkBlockStateType | TextImageBlockStateType
}
