export interface PageContentState {
  blockContent: BlockContent[]
}

export interface BlockContent {
  blockID: string
  atoms: HeadingAtom[] | ExternalLinkBlockStateType[] | ImageSlide[]
  sortOrder: number
}

// 見出し
export interface HeadingAtom {
  atomType: string
  text: string
  placement: placementType
  size: headingSizeType
}

export type placementType = 'left' | 'center' | 'right'
export type headingSizeType = 1 | 2 | 3 | 4 | 5 | 6

// リンク
export interface ExternalLinkTextWithUrl {
  text: string
  url: string
}

export interface ExternalLinkBlockStateType {
  atomType: string
  content: ExternalLinkTextWithUrl[]
}

// 画像スライド
export type ImageSlide = {
  imageSlide: ImageSlideChild[]
}

export type ImageSlideChild = {
  title?: string
  text?: string
  image: any
  base64Image: any
}

