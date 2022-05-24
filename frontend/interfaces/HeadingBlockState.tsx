export type HeadingBlockState = {
  text: string
  placement: placementType
  size: headingSizeType
}

export type placementType = 'left' | 'center' | 'right'
export type headingSizeType = 1 | 2 | 3 | 4 | 5 | 6
