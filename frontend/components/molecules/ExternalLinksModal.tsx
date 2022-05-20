import React, { useState } from 'react'
import { Button, Container, Card, Row, Col, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged } from '../../redux/homepageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import PencilAquareIcon from '../atoms/PencilAquareIcon'

const ExternalLinksModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockModal = useSelector((state: RootState) => state.homepage.showBlockModal)

  const [selectedBlockedType, setSelectedBlockedType] = useState('')
  return (
    <>
      <Modal.Header> 
        <Modal.Title>
          <span>外部リンクを追加</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => { dispatch(showBlockModalChanged(false)); dispatch(blockTypeChanged(''))}}>閉じる</Button>
        <Button variant='primary' onClick={() => dispatch(blockTypeChanged(selectedBlockedType))}>編集を終えてブロックを追加</Button>
      </Modal.Footer>
    </>
  )
}

export default ExternalLinksModal
