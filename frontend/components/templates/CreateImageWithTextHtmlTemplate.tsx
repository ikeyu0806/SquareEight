import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { getBase64 } from 'functions/getBase64'
import { ImageWithTextTemplateContent } from 'interfaces/HtmlMailTemplate'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { htmlMailTemplateChanged, currentMaxSortOrderChanged } from 'redux/htmlMailTemplateSlice'
import UpdateHtmlMailBlockStateIcons from 'components/organisms/UpdateHtmlMailBlockStateIcons'

const CreateImageWithTextHtmlTemplate = (): JSX.Element => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [image, setImage] = useState('/images/noimage.jpeg')
  const [base64Image, setBase64Image] = useState<any>('')
  const [draftText, setDraftText] = useState('')
  const htmlMailTemplate = useSelector((state: RootState) => state.htmlMailTemplate.htmlMailTemplate)
  const currentMaxSortOrder = useSelector((state: RootState) => state.htmlMailTemplate.currentMaxSortOrder)

  useEffect(() => {
    switch(router.query.template_type) {
      case 'ImageWithText':
        dispatch(htmlMailTemplateChanged({templateType: 'ImageWithText', content: [], }))
        break
      default:
        console.log('invalid template_type')
    }
  }, [router.query.template_type, dispatch])

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => setBase64Image(data)
    )
  }

  const addTemplateContent = () => {
    let blockID = new Date().getTime().toString(16)
    let updateHtmlMailTemplate: ImageWithTextTemplateContent[]
    dispatch(currentMaxSortOrderChanged(currentMaxSortOrder + 1))
    updateHtmlMailTemplate = htmlMailTemplate.content
    let additionalHtmlMailTemplate: ImageWithTextTemplateContent
    additionalHtmlMailTemplate = { text: draftText, image: image, base64Image: base64Image, blockID: blockID, sortOrder: currentMaxSortOrder + 1 }
    updateHtmlMailTemplate = [...updateHtmlMailTemplate, additionalHtmlMailTemplate]
    dispatch(htmlMailTemplateChanged({content: updateHtmlMailTemplate, templateType: 'ImageWithText'}))
  }

  return (
    <>
      {htmlMailTemplate.content.map((c, i) => {
          return [
            <div key={i}>
              <img
                className='d-block w-100 mt30'
                src={c.base64Image}
                alt='image'
              />
              <div>{c.text}</div>
            </div>,
            <UpdateHtmlMailBlockStateIcons
              key={i + 1}
              blockID={c.blockID}
              sortOrder={c.sortOrder}></UpdateHtmlMailBlockStateIcons>
          ]
        })
      }
      <hr />
      <Form.Group controlId='formFile' className='mb5 mt10'>
        <Form.Label>画像をアップロード</Form.Label>
        <Form.Control type='file' onChange={handleChangeFile} />
      </Form.Group>
      <div className='mt10'>テキスト</div>
      <Form.Control
        value={draftText}
        onChange={(e) => setDraftText(e.target.value)}
        as='textarea'
        rows={20} />
      <Button
        onClick={addTemplateContent}
        className='mt20'>本文に追加</Button>
    </>
  )
}

export default CreateImageWithTextHtmlTemplate
