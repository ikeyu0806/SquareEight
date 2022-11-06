export interface PageContentState {
  blockContent: BlockContent[]
}

export interface BlockContent {
  blockID: string
  atoms: HeadingAtom[] | TextAtom[] | ExternalLinkBlockStateType[] | IframeAtom[] | ImageAtom[] | ImageSlide[]
  sortOrder: number
}

// 見出し
export interface HeadingAtom {
  atomType: string
  text: string
  placement: placementType
  size: headingSizeType
}

// テキスト
export interface TextAtom {
  atomType: string
  text: string
}

export type placementType = 'left' | 'center' | 'right'
export type headingSizeType = 1 | 2 | 3 | 4 | 5 | 6

// リンク
export interface ExternalLinkTextWithUrl {
  atomType: string
  text: string
  url: string
}

export interface IframeAtom {
  src: string
  width: number
  height: number
}

export interface ExternalLinkBlockStateType {
  atomType: string
  content: ExternalLinkTextWithUrl[]
}

// 画像
export type ImageAtom = {
  atomType: string
  url?: string
  image: any
  base64Image: any
}

// 画像スライド
export type ImageSlide = {
  atomType: string
  imageSlide: ImageSlideChild[]
}

export type ImageSlideChild = {
  title?: string
  text?: string
  image: any
  base64Image: any
  imageSlideTextColor: string
}
