import React from 'react'
import CaretUpSquare from '../atoms/CaretUpSquare'
import CaretDownSquare from '../atoms/CaretDownSquare'
import TrashIcon from '../atoms/TrashIcon'
import { UpdateBlockStateIconsProps } from '../../types/UpdateBlockStateIconsProps'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { PageContentState } from '../../interfaces/PageContentState'
import { pageContentChanged } from '../../redux/homepageSlice'

const UpdateBlockStateIcons = ({ blockID, sortOrder }: UpdateBlockStateIconsProps): JSX.Element => {
  const dispatch = useDispatch()
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)
  const currentMaxSortOrder = useSelector((state: RootState) => state.homepage.currentMaxSortOrder)

  const moveUpBlock = () => {
    let updatePageContentState: PageContentState[]
    const decrementSortOrder = sortOrder - 1
    if (decrementSortOrder < 1) { return true }
    let moveDownPageContent = pageContent.find(content => content.sortOrder === sortOrder)
    let moveUpPageContent = pageContent.find(content => content.sortOrder === decrementSortOrder)
    updatePageContentState = pageContent.filter(content => content.sortOrder !== sortOrder)
    updatePageContentState = updatePageContentState.filter(content => content.sortOrder !== decrementSortOrder)
    dispatch(pageContentChanged(updatePageContentState))
    if (moveDownPageContent !== undefined) {
      let updateMoveDownPageContent = { blockID: moveDownPageContent.blockID,
                                        blockType: moveDownPageContent.blockType,
                                        blockState: moveDownPageContent.blockState,
                                        sortOrder: decrementSortOrder
                                      }
      updatePageContentState = [...updatePageContentState, updateMoveDownPageContent]
    }
    if (moveUpPageContent !== undefined) {
      let updateMoveUpPageContent = { blockID: moveUpPageContent.blockID,
                                      blockType: moveUpPageContent.blockType,
                                      blockState: moveUpPageContent.blockState,
                                      sortOrder: sortOrder
                                    }
      updatePageContentState = [...updatePageContentState, updateMoveUpPageContent]
    }
    dispatch(pageContentChanged(updatePageContentState.sort(function(a, b) { return a.sortOrder < b.sortOrder ? -1 : 1 })))
  }

  const moveDownBlock = () => {
    let updatePageContentState: PageContentState[]
    const incrementSortOrder = sortOrder + 1
    if (incrementSortOrder > currentMaxSortOrder) { return true }
    let moveUpPageContent = pageContent.find(content => content.sortOrder === sortOrder)
    let moveDownPageContent = pageContent.find(content => content.sortOrder === incrementSortOrder)
    updatePageContentState = pageContent.filter(content => content.sortOrder !== sortOrder)
    updatePageContentState = updatePageContentState.filter(content => content.sortOrder !== incrementSortOrder)
    dispatch(pageContentChanged(updatePageContentState))
    if (moveUpPageContent !== undefined) {
      let updateMoveUpPageContent = { blockID: moveUpPageContent.blockID,
                                        blockType: moveUpPageContent.blockType,
                                        blockState: moveUpPageContent.blockState,
                                        sortOrder: incrementSortOrder
                                      }
      updatePageContentState = [...updatePageContentState, updateMoveUpPageContent]
    }
    if (moveDownPageContent !== undefined) {
      let updateMoveUpPageContent = { blockID: moveDownPageContent.blockID,
                                      blockType: moveDownPageContent.blockType,
                                      blockState: moveDownPageContent.blockState,
                                      sortOrder: sortOrder
                                    }
      updatePageContentState = [...updatePageContentState, updateMoveUpPageContent]
    }
    dispatch(pageContentChanged(updatePageContentState.sort(function(a, b) { return a.sortOrder < b.sortOrder ? -1 : 1 })))
  }

  const deleteBlock = () => {
    let updatePageContentState: PageContentState[]
    updatePageContentState = pageContent.filter(content => content.blockID !== blockID)
    dispatch(pageContentChanged(updatePageContentState))
  }

  return (
    <>
      <a className='mr10 color-black none-under-decoration' onClick={moveUpBlock}><CaretUpSquare width={20} height={20} fill={'#5AFF19'}></CaretUpSquare>上に移動</a>
      <a className='mr10 color-black none-under-decoration' onClick={moveDownBlock}><CaretDownSquare width={20} height={20} fill={'#5AFF19'}></CaretDownSquare>下に移動</a>
      <a className='color-black none-under-decoration' onClick={deleteBlock}><TrashIcon width={20} height={20} fill={'#ff0000'}></TrashIcon>ブロックを削除</a>
    </>
  )
}

export default UpdateBlockStateIcons
