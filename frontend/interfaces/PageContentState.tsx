export interface PageContentState {
  blockContent: BlockContent[]
}

export interface BlockContent {
  blockID: string
  atoms: HeadingAtom[] | ExternalLinkBlockStateType[]
  sortOrder: number
}

export interface HeadingAtom {
  text: string
  placement: placementType
  size: headingSizeType
}

export type placementType = 'left' | 'center' | 'right'
export type headingSizeType = 1 | 2 | 3 | 4 | 5 | 6


export interface ExternalLinkBlockContentStateType {
  text: string
  url: string
}

export interface ExternalLinkBlockStateType {
  content: ExternalLinkBlockContentStateType[]
}
