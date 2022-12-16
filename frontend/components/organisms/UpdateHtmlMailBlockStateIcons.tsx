import React from 'react'
import CaretUpSquare from 'components/atoms/CaretUpSquare'
import CaretDownSquare from 'components/atoms/CaretDownSquare'
import TrashIcon from 'components/atoms/TrashIcon'
import PlusCircleIcon from 'components/atoms/PlusCircleIcon'
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

  }

  const moveDownBlock = () => {

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
