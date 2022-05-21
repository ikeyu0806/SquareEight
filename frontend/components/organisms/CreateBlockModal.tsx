import React from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import SelectHomepageBlockModal from './SelectHomepageBlockModal'
import EditTextImageBlockModal from '../molecules/EditTextImageBlockModal'
import EditExternalLinksModal from '../molecules/EditExternalLinksModal'

const CreateBlockModal = (): JSX.Element => {
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
        {blockType === 'externalLinks' && <EditExternalLinksModal></EditExternalLinksModal>}
      </Modal>
    </>
  )
}

export default CreateBlockModal
