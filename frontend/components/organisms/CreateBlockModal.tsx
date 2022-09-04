import React from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import EditHeadingAtomModal from 'components/molecules/EditHeadingAtomModal'
import EditExternalLinksAtomModal from 'components/molecules/EditExternalLinksAtomModal'
import SelectHomepageAtomModal from 'components/organisms/SelectHomepageAtomModal'
import EditImageSlideBlockAtomModal from 'components/molecules/EditImageSlideBlockAtomModal'
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
        {atomType === ATOM_TYPE.IMAGE_SLIDE && <EditImageSlideBlockAtomModal></EditImageSlideBlockAtomModal>}
      </Modal>
    </>
  )
}

export default CreateBlockModal
