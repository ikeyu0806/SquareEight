import React from 'react'
import { Card, Carousel } from 'react-bootstrap'
import { selectedBlockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const SelectImageSlideModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)

  return (
    <Card>
    <Card.Body>
      <input className='form-check-input mr10' type='radio' />
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
  )
}

export default SelectImageSlideModal
