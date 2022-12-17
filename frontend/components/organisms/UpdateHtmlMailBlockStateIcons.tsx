import React from 'react'
import CaretUpSquare from 'components/atoms/CaretUpSquare'
import CaretDownSquare from 'components/atoms/CaretDownSquare'
import TrashIcon from 'components/atoms/TrashIcon'
import { UpdateBlockStateIconsProps } from 'types/UpdateBlockStateIconsProps'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { HtmlMailTemplate,
         ImageWithTextTemplateContent,
         ImageWithTextListTypeTemplateContent } from 'interfaces/HtmlMailTemplate'
import { htmlMailTemplateChanged } from 'redux/htmlMailTemplateSlice'

const UpdateHtmlMailBlockStateIcons = ({ blockID, sortOrder }: UpdateBlockStateIconsProps): JSX.Element => {
  const dispatch = useDispatch()
  const htmlMailTemplate = useSelector((state: RootState) => state.htmlMailTemplate.htmlMailTemplate)
  const currentMaxSortOrder = useSelector((state: RootState) => state.htmlMailTemplate.currentMaxSortOrder)

  const moveUpBlock = () => {
    let htmlMailTemplateContent: ImageWithTextTemplateContent[] | ImageWithTextListTypeTemplateContent[]
    htmlMailTemplateContent = htmlMailTemplate.content
    let updateHtmlMailTemplateContent: ImageWithTextTemplateContent[] | ImageWithTextListTypeTemplateContent[]
    const decrementSortOrder = sortOrder - 1
    if (decrementSortOrder < 1) { return true }
    let moveDownHtmlMailTemplateContent: ImageWithTextTemplateContent | ImageWithTextListTypeTemplateContent | undefined
    updateHtmlMailTemplateContent = htmlMailTemplateContent
    moveDownHtmlMailTemplateContent = htmlMailTemplateContent.find(c => c.sortOrder === sortOrder)
    let moveUpHtmlMailTemplateContent = htmlMailTemplate.content.find(c => c.sortOrder === decrementSortOrder)
    updateHtmlMailTemplateContent = updateHtmlMailTemplateContent.filter(content => content.sortOrder !== sortOrder)
    updateHtmlMailTemplateContent = updateHtmlMailTemplateContent.filter(content => content.sortOrder !== decrementSortOrder)
    if (moveDownHtmlMailTemplateContent !== undefined) {
      moveDownHtmlMailTemplateContent = {
        text: moveDownHtmlMailTemplateContent.text,
        image: moveDownHtmlMailTemplateContent.image,
        base64Image: moveDownHtmlMailTemplateContent.base64Image,
        sortOrder: decrementSortOrder,
        blockID: moveDownHtmlMailTemplateContent.blockID
      }
      updateHtmlMailTemplateContent = [...updateHtmlMailTemplateContent, moveDownHtmlMailTemplateContent]
    }
    if (moveUpHtmlMailTemplateContent !== undefined) {
      moveUpHtmlMailTemplateContent = {
        text: moveUpHtmlMailTemplateContent.text,
        image: moveUpHtmlMailTemplateContent.image,
        base64Image: moveUpHtmlMailTemplateContent.base64Image,
        sortOrder: sortOrder,
        blockID: moveUpHtmlMailTemplateContent.blockID
      }
      updateHtmlMailTemplateContent = [...updateHtmlMailTemplateContent, moveUpHtmlMailTemplateContent]
    }
    updateHtmlMailTemplateContent = updateHtmlMailTemplateContent.sort(function(a, b) { return a.sortOrder < b.sortOrder ? -1 : 1 })
    dispatch(htmlMailTemplateChanged({content: updateHtmlMailTemplateContent, templateType: htmlMailTemplate.templateType}))
  }

  const moveDownBlock = () => {
    let htmlMailTemplateContent: ImageWithTextTemplateContent[] | ImageWithTextListTypeTemplateContent[]
    htmlMailTemplateContent = htmlMailTemplate.content
    let updateHtmlMailTemplateContent: ImageWithTextTemplateContent[] | ImageWithTextListTypeTemplateContent[]
    const incrementSortOrder = sortOrder + 1
    if (incrementSortOrder < 1) { return true }
    let moveDownHtmlMailTemplateContent: ImageWithTextTemplateContent | ImageWithTextListTypeTemplateContent | undefined
    updateHtmlMailTemplateContent = htmlMailTemplateContent
    moveDownHtmlMailTemplateContent = htmlMailTemplateContent.find(c => c.sortOrder === sortOrder)
    let moveUpHtmlMailTemplateContent = htmlMailTemplate.content.find(c => c.sortOrder === incrementSortOrder)
    updateHtmlMailTemplateContent = updateHtmlMailTemplateContent.filter(content => content.sortOrder !== sortOrder)
    updateHtmlMailTemplateContent = updateHtmlMailTemplateContent.filter(content => content.sortOrder !== incrementSortOrder)
    if (moveDownHtmlMailTemplateContent !== undefined) {
      moveDownHtmlMailTemplateContent = {
        text: moveDownHtmlMailTemplateContent.text,
        image: moveDownHtmlMailTemplateContent.image,
        base64Image: moveDownHtmlMailTemplateContent.base64Image,
        sortOrder: incrementSortOrder,
        blockID: moveDownHtmlMailTemplateContent.blockID
      }
      updateHtmlMailTemplateContent = [...updateHtmlMailTemplateContent, moveDownHtmlMailTemplateContent]
    }
    if (moveUpHtmlMailTemplateContent !== undefined) {
      moveUpHtmlMailTemplateContent = {
        text: moveUpHtmlMailTemplateContent.text,
        image: moveUpHtmlMailTemplateContent.image,
        base64Image: moveUpHtmlMailTemplateContent.base64Image,
        sortOrder: sortOrder,
        blockID: moveUpHtmlMailTemplateContent.blockID
      }
      updateHtmlMailTemplateContent = [...updateHtmlMailTemplateContent, moveUpHtmlMailTemplateContent]
    }
    updateHtmlMailTemplateContent = updateHtmlMailTemplateContent.sort(function(a, b) { return a.sortOrder < b.sortOrder ? -1 : 1 })
    dispatch(htmlMailTemplateChanged({content: updateHtmlMailTemplateContent, templateType: htmlMailTemplate.templateType}))
  }

  const deleteBlock = () => {
    let htmlMailTemplateContent: ImageWithTextTemplateContent[] | ImageWithTextListTypeTemplateContent[]
    htmlMailTemplateContent = htmlMailTemplate.content
    htmlMailTemplateContent = htmlMailTemplateContent.filter(content => content.blockID !== blockID)
    dispatch(htmlMailTemplateChanged({templateType: htmlMailTemplate.templateType, content: htmlMailTemplateContent}))
  }

  return (
    <>
      <a className='mr10 color-black none-under-decoration' onClick={moveUpBlock}><CaretUpSquare width={20} height={20} fill={'#5AFF19'}></CaretUpSquare>上に移動</a>
      <a className='mr10 color-black none-under-decoration' onClick={moveDownBlock}><CaretDownSquare width={20} height={20} fill={'#5AFF19'}></CaretDownSquare>下に移動</a>
      <a className='color-black none-under-decoration' onClick={deleteBlock}><TrashIcon width={20} height={20} fill={'#ff0000'}></TrashIcon>削除</a>
    </>
  )
}

export default UpdateHtmlMailBlockStateIcons
