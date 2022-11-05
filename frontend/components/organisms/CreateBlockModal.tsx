import React from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import EditHeadingAtomModal from 'components/molecules/EditHeadingAtomModal'
import EditTextAtomModal from 'components/molecules/EditTextAtomModal'
import EditExternalLinksAtomModal from 'components/molecules/EditExternalLinksAtomModal'
import EditIframeAtomModal from 'components/molecules/EditIframeAtomModal'
import SelectWebPageAtomModal from 'components/organisms/SelectWebPageAtomModal'
import EditImageBlockAtomModal from 'components/molecules/EditImageBlockAtomModal'
import EditImageSlideBlockAtomModal from 'components/molecules/EditImageSlideBlockAtomModal'
import { ATOM_TYPE } from 'constants/atomType'

const CreateBlockModal = (): JSX.Element => {
  const showBlockModal = useSelector((state: RootState) => state.webpage.showBlockModal)
  const blockType = useSelector((state: RootState) => state.webpage.blockType)
  const selectedAtomType = useSelector((state: RootState) => state.webpage.selectedAtomType)

  return (
    <>
      <Modal show={showBlockModal} size='lg'>
        {selectedAtomType === '' && <SelectWebPageAtomModal></SelectWebPageAtomModal>}
        {selectedAtomType === ATOM_TYPE.TEXT && <EditTextAtomModal></EditTextAtomModal>}
        {selectedAtomType === ATOM_TYPE.HEADING && <EditHeadingAtomModal></EditHeadingAtomModal>}
        {selectedAtomType === ATOM_TYPE.EXTERNAL_LINKS && <EditExternalLinksAtomModal></EditExternalLinksAtomModal>}
        {selectedAtomType === ATOM_TYPE.IFRAME && <EditIframeAtomModal></EditIframeAtomModal>}
        {selectedAtomType === ATOM_TYPE.IMAGE && <EditImageBlockAtomModal></EditImageBlockAtomModal>}
        {selectedAtomType === ATOM_TYPE.IMAGE_SLIDE && <EditImageSlideBlockAtomModal></EditImageSlideBlockAtomModal>}
      </Modal>
    </>
  )
}

export default CreateBlockModal
