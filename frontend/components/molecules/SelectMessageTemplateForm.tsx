import React from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { titleChanged, contentChanged, publicIdChanged } from 'redux/messageTemplateSlice'
import { messageTemplateTypeChanged } from 'redux/sendMailSlice'

const SelectMessageTemplateForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const messageTemplateType = useSelector((state: RootState) => state.sendMail.messageTemplateType)
  const messageTemplates = useSelector((state: RootState) => state.account.messageTemplates)

  return (
    <>
      <Form.Check
        type='radio'
        name='isUseMessageTemplate'
        id='notUseMessageTemplate'
        label='メッセージテンプレートを使用しない'
        onChange={() => dispatch(messageTemplateTypeChanged('notUse'))}
        checked={messageTemplateType === 'notUse'} />
      <Form.Check
        type='radio'
        name='isUseMessageTemplate'
        id='useMessageTemplate'
        label='メッセージテンプレートから入力'
        onChange={() => dispatch(messageTemplateTypeChanged('messageTemplate'))}
        checked={messageTemplateType === 'messageTemplate'} />
      <Form.Check
        type='radio'
        name='isUseHtmlMailTemplate'
        id='useHtmlMailTemplate'
        label='HTMLメールテンプレートから送信'
        onChange={() => dispatch(messageTemplateTypeChanged('htmlMailTemplate'))}
        checked={messageTemplateType === 'htmlMailTemplate'} />
      {messageTemplateType === 'messageTemplate' && <div className='ml10'>
        {messageTemplates.map((template, i) => {
          return (
            <Form.Check
              key={i}
              type='radio'
              label={template.name}
              name='MessageTemplate'
              id={'messageTemplate' + i}
              onChange={() => {
                dispatch(titleChanged(template.title))
                dispatch(contentChanged(template.content));
                dispatch(publicIdChanged(template.public_id));
              }}
            />
          )
        })}
      </div>}
    </>
  )
}

export default SelectMessageTemplateForm
