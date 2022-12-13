import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { contentChanged } from 'redux/messageTemplateSlice'
import { RootState } from 'redux/store'

const MessageTemplateContentForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const content = useSelector((state: RootState) => state.messageTemplate.content)

  return (
    <Form.Control
      onChange={(e) => dispatch(contentChanged(e.target.value))}
      value={content}
      as='textarea'
      rows={20}></Form.Control>
  )
}

export default MessageTemplateContentForm
