import React from 'react'
import CaretUpSquare from 'components/atoms/CaretUpSquare'
import CaretDownSquare from 'components/atoms/CaretDownSquare'
import TrashIcon from 'components/atoms/TrashIcon'
import PlusCircleIcon from 'components/atoms/PlusCircleIcon'
import { UpdateBlockStateIconsProps } from 'types/UpdateBlockStateIconsProps'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { PageContentState } from 'interfaces/PageContentState'
import { pageContentChanged } from 'redux/webpageSlice'
import { BlockContent } from 'interfaces/PageContentState'

const UpdateBlockStateIcons = ({ blockID, sortOrder }: UpdateBlockStateIconsProps): JSX.Element => {
  const dispatch = useDispatch()
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)
  const currentMaxSortOrder = useSelector((state: RootState) => state.webpage.currentMaxSortOrder)

  const moveUpBlock = () => {
  }

  const moveDownBlock = () => {
  }

  const deleteBlock = () => {
  }

  return (
    <>
      <a className='mr10 color-black none-under-decoration' onClick={() => console.log('')}><PlusCircleIcon width={20} height={20} fill={'#0000FF'}></PlusCircleIcon>列を追加</a>
      <a className='mr10 color-black none-under-decoration' onClick={() => console.log('')}><CaretUpSquare width={20} height={20} fill={'#5AFF19'}></CaretUpSquare>上に移動</a>
      <a className='mr10 color-black none-under-decoration' onClick={() => console.log('')}><CaretDownSquare width={20} height={20} fill={'#5AFF19'}></CaretDownSquare>下に移動</a>
      <a className='color-black none-under-decoration' onClick={() => console.log('')}><TrashIcon width={20} height={20} fill={'#ff0000'}></TrashIcon>ブロックを削除</a>
    </>
  )
}

export default UpdateBlockStateIcons
