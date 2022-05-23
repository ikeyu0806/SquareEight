import React from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import SelectHomepageBlockModal from './SelectHomepageBlockModal'
import EditTextImageBlockModal from '../molecules/EditTextImageBlockModal'
import EditExternalLinksModal from '../molecules/EditExternalLinksModal'
import EditHeadingModal from '../molecules/EditHeadingModal'
import { BLOCK_TYPE } from '../../constants/blockType'

const CreateBlockModal = (): JSX.Element => {
  const showBlockModal = useSelector((state: RootState) => state.homepage.showBlockModal)
  const blockType = useSelector((state: RootState) => state.homepage.blockType)

  return (
    <>
      <Modal show={showBlockModal} size='lg'>
        {blockType === '' && <SelectHomepageBlockModal></SelectHomepageBlockModal>}
        {blockType === BLOCK_TYPE.HEADING && <EditHeadingModal></EditHeadingModal>}
        {blockType === BLOCK_TYPE.TEXT_IMAGE && <EditTextImageBlockModal></EditTextImageBlockModal>}
        {blockType === BLOCK_TYPE.EXTERNAL_LINKS && <EditExternalLinksModal></EditExternalLinksModal>}
      </Modal>
    </>
  )
}

export default CreateBlockModal
