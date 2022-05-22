export type BlockContentStateType = {
  text: string
  url: string
}

export type BlockStateType = {
  title: string
  content: BlockContentStateType[]
}
