import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { selectedBlockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const SelectTextImageModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)

  return (
    <Card>
      <Card.Body>
        <input className='form-check-input mr10' type='radio'onChange={() => dispatch(selectedBlockTypeChanged('textImage'))} />
        <span>テキスト+画像</span>
        <div className='mt10'>テキストと画像で構成されたブロックを追加します。画像にはページリンクを設定できます</div>
        {showBlockSample &&
        <>
          <br />
          <hr />
          <Row>
            <Col>
              <h2>見出し</h2>
              <div>
                本文
              </div>
            </Col>
            <Col>
            <img
              className='d-block w-100'
              src='/images/classroom.jpg'
              alt='image'
            />
            </Col>
          </Row>
        </>}
      </Card.Body>
    </Card>
  )
}

export default SelectTextImageModal
