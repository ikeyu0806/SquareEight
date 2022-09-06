import { Form } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const SharedComponentFooterForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const footerCopyRightText =  useSelector((state: RootState) => state.sharedComponent.footerCopyRightText)

  return (
    <>
      <h3>フッタ編集</h3>
      <Form.Label>Copyrightの後に続く文言を設定してください</Form.Label>
      <Form.Control
        value={footerCopyRightText}
        onChange={(e) => dispatch(footerCopyRightTextChanged(e.target.value))}
        className='mt20'></Form.Control> 
    </>
  )
}

export default SharedComponentFooterForm
