import { ListGroup, Button } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { contentChanged } from "redux/messageTemplateSlice"

const MessageTemplateVariables = (): JSX.Element => {
  const dispatch = useDispatch()
  const content = useSelector((state: RootState) => state.messageTemplate.content)

  const insertVariable = (variable: string) => {
    let updateContent: string
    updateContent = content + variable
    dispatch(contentChanged(updateContent))
  }

  return (
    <>
      <div>変数</div>
        <div>
          <ListGroup>
            <ListGroup.Item>
              <div>%customer_name</div>
              <div className='mt10'>顧客名に変換されます</div>
              <Button size='sm' className='mt5' onClick={() => insertVariable('%customer_name')}>挿入</Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <div>%price</div>
              <div className='mt10'>請求金額に変換されます</div>
              <div>決済リクエスト送信時に反映されます</div>
              <Button size='sm' className='mt5' onClick={() => insertVariable('%price')}>挿入</Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <div>%payment_request_url</div>
              <div className='mt10'>決済リクエスト作成画面URLに変換されます</div>
              <div>決済リクエスト送信時に反映されます</div>
              <Button size='sm' className='mt5' onClick={() => insertVariable('%payment_request_url')}>挿入</Button>
            </ListGroup.Item>
          </ListGroup>
        </div>
    </>
  )
}

export default MessageTemplateVariables
