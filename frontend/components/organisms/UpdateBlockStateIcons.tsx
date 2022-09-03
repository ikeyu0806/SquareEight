import React from 'react'
import CaretUpSquare from 'components/atoms/CaretUpSquare'
import CaretDownSquare from 'components/atoms/CaretDownSquare'
import TrashIcon from 'components/atoms/TrashIcon'
import PlusCircleIcon from 'components/atoms/PlusCircleIcon'
import { UpdateBlockStateIconsProps } from 'types/UpdateBlockStateIconsProps'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { pageContentChanged,
         selectedBlockIDChanged,
         showBlockModalChanged,
         addAtomSelectedBlockChanged } from 'redux/webpageSlice'
import { BlockContent } from 'interfaces/PageContentState'

const UpdateBlockStateIcons = ({ blockID, sortOrder }: UpdateBlockStateIconsProps): JSX.Element => {
  const dispatch = useDispatch()
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)
  const currentMaxSortOrder = useSelector((state: RootState) => state.webpage.currentMaxSortOrder)

  const moveUpBlock = () => {
    let updatePageContentState: BlockContent[]
    const decrementSortOrder = sortOrder - 1
    if (decrementSortOrder < 1) { return true }
    let moveDownPageContent = pageContent.blockContent.find(content => content.sortOrder === sortOrder)
    let moveUpPageContent = pageContent.blockContent.find(content => content.sortOrder === decrementSortOrder)
    updatePageContentState = pageContent.blockContent.filter(content => content.sortOrder !== sortOrder)
    updatePageContentState = updatePageContentState.filter(content => content.sortOrder !== decrementSortOrder)
    dispatch(pageContentChanged({blockContent: updatePageContentState}))
    if (moveDownPageContent !== undefined) {
      let updateMoveDownPageContent: BlockContent = { blockID: moveDownPageContent.blockID,
                                                      atoms: moveDownPageContent.atoms,
                                                      sortOrder: decrementSortOrder
                                                    }
      updatePageContentState = [...updatePageContentState, updateMoveDownPageContent]
    }
    if (moveUpPageContent !== undefined) {
      let updateMoveUpPageContent: BlockContent = { blockID: moveUpPageContent.blockID,
                                      atoms: moveUpPageContent.atoms,
                                      sortOrder: sortOrder
                                    }
      updatePageContentState = [...updatePageContentState, updateMoveUpPageContent]
    }
    dispatch(pageContentChanged({blockContent: updatePageContentState.sort(function(a, b) { return a.sortOrder < b.sortOrder ? -1 : 1 })}))
  }

  const moveDownBlock = () => {
    let updatePageContentState: BlockContent[]
    const incrementSortOrder = sortOrder + 1
    if (incrementSortOrder > currentMaxSortOrder) { return true }
    let moveUpPageContent = pageContent.blockContent.find(content => content.sortOrder === sortOrder)
    let moveDownPageContent = pageContent.blockContent.find(content => content.sortOrder === incrementSortOrder)
    updatePageContentState = pageContent.blockContent.filter(content => content.sortOrder !== sortOrder)
    updatePageContentState = updatePageContentState.filter(content => content.sortOrder !== incrementSortOrder)
    dispatch(pageContentChanged({blockContent: updatePageContentState}))
    if (moveUpPageContent !== undefined) {
      let updateMoveUpPageContent: BlockContent = { blockID: moveUpPageContent.blockID,
                                                    atoms: moveUpPageContent.atoms,
                                                    sortOrder: incrementSortOrder
                                                  }
      updatePageContentState = [...updatePageContentState, updateMoveUpPageContent]
    }
    if (moveDownPageContent !== undefined) {
      let updateMoveUpPageContent: BlockContent = { blockID: moveDownPageContent.blockID,
                                                    atoms: moveDownPageContent.atoms,
                                                    sortOrder: sortOrder
                                                  }
      updatePageContentState = [...updatePageContentState, updateMoveUpPageContent]
    }
    dispatch(pageContentChanged({blockContent: updatePageContentState.sort(function(a, b) { return a.sortOrder < b.sortOrder ? -1 : 1 })}))
  }

  const deleteBlock = () => {
    let updatePageContentState: BlockContent[]
    updatePageContentState = pageContent.blockContent.filter(content => content.blockID !== blockID)
    dispatch(pageContentChanged({blockContent: updatePageContentState}))
  }

  const addBlockAtom = () => {
    dispatch(showBlockModalChanged(true))
    dispatch(addAtomSelectedBlockChanged(true))
    dispatch(selectedBlockIDChanged(blockID))
  }

  return (
    <>
      <a className='mr10 color-black none-under-decoration' onClick={addBlockAtom}><PlusCircleIcon width={20} height={20} fill={'#0000FF'}></PlusCircleIcon>列を追加</a>
      <a className='mr10 color-black none-under-decoration' onClick={moveUpBlock}><CaretUpSquare width={20} height={20} fill={'#5AFF19'}></CaretUpSquare>上に移動</a>
      <a className='mr10 color-black none-under-decoration' onClick={moveDownBlock}><CaretDownSquare width={20} height={20} fill={'#5AFF19'}></CaretDownSquare>下に移動</a>
      <a className='color-black none-under-decoration' onClick={deleteBlock}><TrashIcon width={20} height={20} fill={'#ff0000'}></TrashIcon>ブロックを削除</a>
    </>
  )
}

export default UpdateBlockStateIcons
