import React from 'react'
import { Card, Carousel } from 'react-bootstrap'
import { selectedBlockTypeChanged, blockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { BLOCK_TYPE } from '../../constants/blockType'

const SelectImageSlideModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)
  const selectedBlockType = useSelector((state: RootState) => state.homepage.selectedBlockType)

  return (
    <div onClick={() => dispatch(selectedBlockTypeChanged(BLOCK_TYPE.IMAGE_SLIDE))}>
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 checked={selectedBlockType === BLOCK_TYPE.IMAGE_SLIDE}
                 onChange={() => dispatch(blockTypeChanged(BLOCK_TYPE.IMAGE_SLIDE))}
                 type='radio'/>
          <span>画像スライド</span>
          <div className='mt10'>画像スライドを追加します</div>
          {showBlockSample &&
          <>
            <br />
            <hr />
            <Carousel>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='/images/wait_training.jpg'
                  alt='First slide'
                />
                <Carousel.Caption>
                  <h3>見出し</h3>
                  <p>本文</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='/images/meeting.jpg'
                  alt='Second slide'
                />

                <Carousel.Caption>
                  <h3>見出し</h3>
                  <p>本文</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='/images/classroom.jpg'
                  alt='Third slide'
                />

                <Carousel.Caption>
                  <h3>見出し</h3>
                  <p>本文</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </>}
        </Card.Body>
      </Card>
    </div>
  )
}

export default SelectImageSlideModal
