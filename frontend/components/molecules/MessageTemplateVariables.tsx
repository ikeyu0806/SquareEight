import { ListGroup, Button } from "react-bootstrap"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
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
              <div>顧客一覧からの送信時に反映されます</div>
              <Button size='sm' className='mt5' onClick={() => insertVariable('%customer_name')}>挿入</Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <div>%customer_postalcode</div>
              <div className='mt10'>顧客の郵便番号に変換されます</div>
              <div>顧客一覧からの送信時に反映されます</div>
              <Button size='sm' className='mt5' onClick={() => insertVariable('%customer_postalcode')}>挿入</Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <div>%customer_address</div>
              <div className='mt10'>顧客の住所に変換されます</div>
              <div>顧客一覧からの送信時に反映されます</div>
              <Button size='sm' className='mt5' onClick={() => insertVariable('%customer_address')}>挿入</Button>
            </ListGroup.Item>
          </ListGroup>
        </div>
    </>
  )
}

export default MessageTemplateVariables
