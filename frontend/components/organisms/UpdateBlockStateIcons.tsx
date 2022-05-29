import React from 'react'
import CaretUpSquare from '../atoms/CaretUpSquare'
import CaretDownSquare from '../atoms/CaretDownSquare'
import TrashIcon from '../atoms/TrashIcon'
import { UpdateBlockStateIconsProps } from '../../interfaces/UpdateBlockStateIconsProps'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { PageContentState } from '../../interfaces/PageContentState'
import { pageContentChanged } from '../../redux/homepageSlice'

const UpdateBlockStateIcons = ({ blockID, sortOrder }: UpdateBlockStateIconsProps): JSX.Element => {
  const dispatch = useDispatch()
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)

  const deleteBlock = () => {
    let updatePageContentState: PageContentState[]
    updatePageContentState = pageContent.filter(content => content.blockID !== blockID)
    dispatch(pageContentChanged(updatePageContentState))
  }

  return (
    <>
      <a className='mr10 color-black none-under-decoration'><CaretUpSquare width={20} height={20} fill={'#5AFF19'}></CaretUpSquare>上に移動</a>
      <a className='mr10 color-black none-under-decoration'><CaretDownSquare width={20} height={20} fill={'#5AFF19'}></CaretDownSquare>下に移動</a>
      <a className='color-black none-under-decoration' onClick={deleteBlock}><TrashIcon width={20} height={20} fill={'#ff0000'}></TrashIcon>ブロックを削除</a>
    </>
  )
}

export default UpdateBlockStateIcons
