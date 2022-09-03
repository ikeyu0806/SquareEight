import React from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import EditHeadingAtomModal from 'components/molecules/EditHeadingAtomModal'
import SelectWebpageTextAtomModal from 'components/molecules/SelectWebpageHeadingAtomModal'
import SelectHomepageAtomModal from './SelectHomepageAtomModal'
import EditImageSlideBlockModal from 'components/molecules/EditImageSlideBlockModal'
import EditTextImageBlockModal from 'components/molecules/EditTextImageBlockModal'
import EditExternalLinksModal from 'components/molecules/EditExternalLinksModal'
import { BLOCK_TYPE } from 'constants/blockType'
import { ATOM_TYPE } from 'constants/atomType'

const CreateBlockModal = (): JSX.Element => {
  const showBlockModal = useSelector((state: RootState) => state.webpage.showBlockModal)
  const blockType = useSelector((state: RootState) => state.webpage.blockType)
  const atomType = useSelector((state: RootState) => state.webpage.atomType)

  return (
    <>
      <Modal show={showBlockModal} size='lg'>
        {atomType === '' && <SelectHomepageAtomModal></SelectHomepageAtomModal>}
        {atomType === ATOM_TYPE.HEADING && <EditHeadingAtomModal></EditHeadingAtomModal>}
        {blockType === BLOCK_TYPE.IMAGE_SLIDE && <EditImageSlideBlockModal></EditImageSlideBlockModal>}
        {blockType === BLOCK_TYPE.TEXT_IMAGE && <EditTextImageBlockModal></EditTextImageBlockModal>}
        {blockType === BLOCK_TYPE.EXTERNAL_LINKS && <EditExternalLinksModal></EditExternalLinksModal>}
      </Modal>
    </>
  )
}

export default CreateBlockModal
