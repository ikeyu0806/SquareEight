import React, { useState } from 'react'
import { Button, Container, Card, Row, Col, Modal } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged } from '../../redux/homepageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import SelectHomepageBlockModal from '../molecules/SelectHomepageBlockModal'
import EditTextImageBlockModal from '../molecules/EditTextImageBlockModal'

const CreateBlockModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockModal = useSelector((state: RootState) => state.homepage.showBlockModal)
  const blockType = useSelector((state: RootState) => state.homepage.blockType)

  const BLOCKTYPE = {
    Small: 'small'
  }
  return (
    <>
      <Modal show={showBlockModal} size='lg'>
        {blockType === '' && <SelectHomepageBlockModal></SelectHomepageBlockModal>}
        {blockType === 'textImage' && <EditTextImageBlockModal></EditTextImageBlockModal>}
      </Modal>
    </>
  )
}

export default CreateBlockModal
