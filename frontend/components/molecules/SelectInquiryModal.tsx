import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { selectedBlockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { BLOCK_TYPE } from '../../constants/blockType'

const SelectInquiryModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)
  const selectedBlockType = useSelector((state: RootState) => state.homepage.selectedBlockType)

  return (
    <div onClick={() => dispatch(selectedBlockTypeChanged(BLOCK_TYPE.INQUIRY))}>
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 type='radio'
                 onChange={() => console.log('checked')}
                 checked={selectedBlockType === BLOCK_TYPE.INQUIRY} />
          <span>お問い合わせフォーム</span>
          <div className='mt10'>お問い合わせフォームを追加します。</div>
          {showBlockSample &&
          <>
            <br />
            <hr />
            <Form>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>メールアドレス</Form.Label>
                <Form.Control type='email' disabled />
                <Form.Text className='text-muted'>
                </Form.Text>
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>お問い合わせ内容</Form.Label>
                <Form.Control as='textarea' rows={10} disabled />
              </Form.Group>
              <Button variant='primary' type='submit' disabled>
                送信
              </Button>
            </Form>
          </>}
        </Card.Body>
      </Card>
    </div>
  )
}

export default SelectInquiryModal
