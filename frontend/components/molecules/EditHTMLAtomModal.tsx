import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { pageContentChanged,
         showBlockModalChanged,
         atomTypeChanged,
         selectedAtomTypeChanged,
         currentMaxSortOrderChanged,
         addAtomSelectedBlockChanged } from 'redux/webpageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { PageContentState } from 'interfaces/PageContentState'
import { HTMLAtom } from 'interfaces/PageContentState'
import { BlockContent } from 'interfaces/PageContentState'
import parse from 'html-react-parser'

const EditHTMLAtomModal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [inputHTML, setInputHTML] = useState('')
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)
  const currentMaxSortOrder = useSelector((state: RootState) => state.webpage.currentMaxSortOrder)
  const addAtomSelectedBlock = useSelector((state: RootState) => state.webpage.addAtomSelectedBlock)
  const selectedBlockID = useSelector((state: RootState) => state.webpage.selectedBlockID)

  const completeEdit = () => {
    if (addAtomSelectedBlock) {
      addAtomSelectedBlockFunc()
    } else {
      addAtomNewBlockFunc()
    }
  }

  const addAtomSelectedBlockFunc = () => {
    let targetBlockContentState: BlockContent | undefined = pageContent.blockContent.find(content => content.blockID === selectedBlockID)
    if (targetBlockContentState !== undefined) {
      let updateAtoms: HTMLAtom[] = targetBlockContentState.atoms as HTMLAtom[]
      updateAtoms = [...updateAtoms, { atomType: 'html', html: inputHTML } as HTMLAtom]
      let insertBlockContentState: BlockContent = { atoms: updateAtoms, blockID: targetBlockContentState.blockID, sortOrder: targetBlockContentState.sortOrder }
      let filterBlockContents = pageContent.blockContent.filter(content => content.blockID !== insertBlockContentState.blockID)
      let updatePageContentState: PageContentState = { blockContent: [...filterBlockContents, insertBlockContentState] }
      dispatch((pageContentChanged(updatePageContentState)))
      dispatch(showBlockModalChanged(false))
      dispatch(atomTypeChanged(''))
      dispatch(selectedAtomTypeChanged(''))
      dispatch(addAtomSelectedBlockChanged(false))
    }
  }

  const addAtomNewBlockFunc = () => {
    let TextAtomState: HTMLAtom
    TextAtomState = { atomType: 'html', html: inputHTML }
    let blockID = new Date().getTime().toString(16)
    let BlockState: BlockContent
    BlockState = { blockID: blockID, atoms: [TextAtomState], sortOrder: currentMaxSortOrder + 1 }
    let updatePageContentState: PageContentState = { blockContent: [...pageContent.blockContent, BlockState] }
    dispatch(pageContentChanged(updatePageContentState))
    dispatch(showBlockModalChanged(false))
    dispatch(atomTypeChanged(''))
    dispatch(selectedAtomTypeChanged(''))
    dispatch(currentMaxSortOrderChanged(currentMaxSortOrder + 1))
  }

  const closeModal = () => {
    dispatch(showBlockModalChanged(false))
    dispatch(selectedAtomTypeChanged(''))
    dispatch(addAtomSelectedBlockChanged(false))
    dispatch(atomTypeChanged(''))
  }

  const execBack = () => {
    dispatch(atomTypeChanged(''))
    dispatch(selectedAtomTypeChanged(''))
  }

  return (
    <>
      <Modal.Header> 
        <Modal.Title>
          <span>HTMLを埋め込み</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Text>HTMLを入力してください</Form.Text>
            <Form.Control placeholder=''
                          value={inputHTML}
                          as='textarea'
                          rows={30}
                          onChange={(e) => setInputHTML(e.target.value)}></Form.Control>
          </Form.Group>
        </Form>
        <div className='mt20'>プレビュー</div>
        <br />
        {parse(inputHTML)}
        <div>
          
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary'
                onClick={() => execBack()}>戻る</Button>
        <Button variant='secondary'
                onClick={() => closeModal()}>閉じる</Button>
        <Button variant='primary' onClick={completeEdit}>編集を終えて要素を追加</Button>
      </Modal.Footer>
    </>
  )
}

export default EditHTMLAtomModal
