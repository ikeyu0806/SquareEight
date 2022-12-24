import React from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { titleChanged, contentChanged, publicIdChanged } from 'redux/messageTemplateSlice'
import { messageTemplateTypeChanged, selectedHtmlMailTemplateChanged } from 'redux/sendMailSlice'

interface Props {
  hideHtmlMailTemplate?: boolean
}

const SelectMessageTemplateForm = ({hideHtmlMailTemplate}: Props): JSX.Element => {
  const dispatch = useDispatch()
  const messageTemplateType = useSelector((state: RootState) => state.sendMail.messageTemplateType)
  const selectedHtmlMailTemplate = useSelector((state: RootState) => state.sendMail.selectedHtmlMailTemplate)
  const messageTemplates = useSelector((state: RootState) => state.account.messageTemplates)
  const htmlMailTemplate = useSelector((state: RootState) => state.account.htmlMailTemplate)

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
      {!hideHtmlMailTemplate && <Form.Check
        type='radio'
        name='isUseHtmlMailTemplate'
        id='useHtmlMailTemplate'
        label='HTMLメールテンプレートから送信'
        onChange={() => dispatch(messageTemplateTypeChanged('htmlMailTemplate'))}
        checked={messageTemplateType === 'htmlMailTemplate'} />}
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
      {messageTemplateType === 'htmlMailTemplate' && <div className='ml10'>
        {htmlMailTemplate.map((template, i) => {
          return (
            <Form.Check
              key={i}
              type='radio'
              label={template.name}
              checked={template.public_id === selectedHtmlMailTemplate.public_id}
              onChange={() => dispatch(selectedHtmlMailTemplateChanged((template)))}
              name='HtmlMailTemplate'
              id={'htmlMailTemplate' + i}
            />
          )
        })}
      </div>
      }
    </>
  )
}

export default SelectMessageTemplateForm
