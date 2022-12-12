import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { messageChanged } from 'redux/lineOfficialAccountSlice'

const LineMessageForm = (): JSX.Element => {
  const dispatch = useDispatch()
  return (
    <Form.Control
      onChange={(e) => dispatch(messageChanged(e.target.value))}
      as='textarea'
      rows={20}></Form.Control>
  )
}

export default LineMessageForm
