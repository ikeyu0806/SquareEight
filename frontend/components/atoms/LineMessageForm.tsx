import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { messageChanged } from 'redux/lineOfficialAccountSlice'
import { RootState } from 'redux/store'

const LineMessageForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const message = useSelector((state: RootState) => state.lineOfficialAccount.message)

  return (
    <Form.Control
      onChange={(e) => dispatch(messageChanged(e.target.value))}
      value={message}
      as='textarea'
      rows={20}></Form.Control>
  )
}

export default LineMessageForm
