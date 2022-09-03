import React from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import EditHeadingAtomModal from 'components/molecules/EditHeadingAtomModal'
import EditExternalLinksAtomModal from 'components/molecules/EditExternalLinksAtomModal'
import SelectWebpageTextAtomModal from 'components/molecules/SelectHeadingAtomModal'
import SelectHomepageAtomModal from './SelectHomepageAtomModal'
import EditImageSlideBlockModal from 'components/molecules/EditImageSlideBlockModal'
import EditTextImageBlockModal from 'components/molecules/EditTextImageBlockModal'
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
        {atomType === ATOM_TYPE.EXTERNAL_LINKS && <EditExternalLinksAtomModal></EditExternalLinksAtomModal>}
        {blockType === BLOCK_TYPE.IMAGE_SLIDE && <EditImageSlideBlockModal></EditImageSlideBlockModal>}
        {blockType === BLOCK_TYPE.TEXT_IMAGE && <EditTextImageBlockModal></EditTextImageBlockModal>}
      </Modal>
    </>
  )
}

export default CreateBlockModal
