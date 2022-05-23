export type HeadingBlockState = {
  placement: placementType
  size: headingSizeType
}

type placementType = 'left' | 'center' | 'right'
type headingSizeType = 1 | 2 | 3 | 4 | 5 | 6
