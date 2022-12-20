import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showMessageBodyModalChanged } from 'redux/sendMailHistorySlice'
import htmlMailTemplateStyles from 'styles/HtmlMailTemplate.module.css'

const MessageBodyModal = () => {
  const dispatch = useDispatch()
  const selectedMessageBody = useSelector((state: RootState) => state.sendMailHistory.selectedMessageBody)
  const selectedParsedMessageBody = useSelector((state: RootState) => state.sendMailHistory.selectedParsedMessageBody)
  const selectedMessageType = useSelector((state: RootState) => state.sendMailHistory.selectedMessageType)
  const showMessageBodyModal = useSelector((state: RootState) => state.sendMailHistory.showMessageBodyModal)
  const selectedHtmlTemplateType = useSelector((state: RootState) => state.sendMailHistory.selectedHtmlTemplateType)

  return (
    <Modal show={showMessageBodyModal} size='lg'>
      <Modal.Body>
        {selectedMessageType === 'MessageTemplate' && selectedMessageBody}
        {selectedMessageType === 'HtmlMailTemplate' &&
        <>
          {selectedHtmlTemplateType === 'ImageWithText' &&
          <>
            {selectedParsedMessageBody.map((message, i) => {
              return (
                <div key={i}>
                  <img
                    className='d-block w-100 mt30'
                    src={message.image}
                    alt='image'
                  />
                  <div>{message.text}</div>
                </div>
              )
            })}
          </>}
          {selectedHtmlTemplateType === 'ImageWithTextList' &&
          <>
            {selectedParsedMessageBody.map((message, i) => {
              return (
                <Row key={i}>
                  <Col>
                    <img
                      className={htmlMailTemplateStyles.list_picture_url}
                      src={message.image}
                      alt='image'
                    />
                  </Col>
                  <Col>
                    <div>{message.text}</div>
                  </Col>
                </Row>
              )
            })}
          </>}
        </>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => dispatch(showMessageBodyModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MessageBodyModal
