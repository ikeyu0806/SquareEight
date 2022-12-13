import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { contentChanged, publicIdChanged } from 'redux/messageTemplateSlice'

const SelectMessageTemplateForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const [isUseMessageTemplate, setIsUseMessageTemplate] = useState(false)
  const messageTemplates = useSelector((state: RootState) => state.account.messageTemplates)

  return (
    <>
      <Form.Check
        type='radio'
        name='isUseMessageTemplate'
        id='notUseMessageTemplate'
        label='メッセージテンプレートを使用しない'
        onChange={() => setIsUseMessageTemplate(false)}
        checked={!isUseMessageTemplate} />
      <Form.Check
        type='radio'
        name='isUseMessageTemplate'
        id='useMessageTemplate'
        label='メッセージテンプレートから本文を入力'
        onChange={() => setIsUseMessageTemplate(true)}
        checked={isUseMessageTemplate} />
      {isUseMessageTemplate && <div className='ml10'>
        {messageTemplates.map((template, i) => {
          return (
            <Form.Check
              key={i}
              type='radio'
              label={template.name}
              name='MessageTemplate'
              id={'messageTemplate' + i}
              onChange={() => {
                dispatch(contentChanged(template.content));
                dispatch(publicIdChanged(template.public_id))
              }}
            />
          )
        })}
      </div>}
    </>
  )
}

export default SelectMessageTemplateForm
