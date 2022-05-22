import React from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import SelectHomepageBlockModal from './SelectHomepageBlockModal'
import EditTextImageBlockModal from '../molecules/EditTextImageBlockModal'
import EditExternalLinksModal from '../molecules/EditExternalLinksModal'
import { BLOCK_TYPE } from '../../constants/blockType'

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
        {blockType === BLOCK_TYPE.TEXT_IMAGE && <EditTextImageBlockModal></EditTextImageBlockModal>}
        {blockType === BLOCK_TYPE.EXTERNAL_LINKS && <EditExternalLinksModal></EditExternalLinksModal>}
      </Modal>
    </>
  )
}

export default CreateBlockModal
