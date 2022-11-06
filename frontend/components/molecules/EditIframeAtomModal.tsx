import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { pageContentChanged,
        showBlockModalChanged,
        blockTypeChanged,
        selectedAtomTypeChanged,
        addAtomSelectedBlockChanged,
        atomTypeChanged,
        currentMaxSortOrderChanged } from 'redux/webpageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { PageContentState } from 'interfaces/PageContentState'
import { ExternalLinkBlockStateType } from 'interfaces/PageContentState'
import { useCookies } from 'react-cookie'
import { PageLinksParam } from 'interfaces/PageLinksParam'
import { BlockContent } from 'interfaces/PageContentState'
import { ATOM_TYPE } from 'constants/atomType'
import { IframeAtom } from 'interfaces/PageContentState'
import axios from 'axios'

const EditIframeAtomModal = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const [pageLinks, setPageLinks] = useState<PageLinksParam[]>([])

  const [inputSrc, setInputSrc] = useState('')
  const [inputWidth, setInputWidth] = useState(300)
  const [inputHeight, setInputHeight] = useState(300)
  const [inputSrcType, setInputSrcType] = useState('inputSrc')
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)
  const currentMaxSortOrder = useSelector((state: RootState) => state.webpage.currentMaxSortOrder)
  const addAtomSelectedBlock = useSelector((state: RootState) => state.webpage.addAtomSelectedBlock)
  const selectedBlockID = useSelector((state: RootState) => state.webpage.selectedBlockID)

  useEffect(() => {
    const fetchPageLinks = () => {
      axios.get(`${process.env.BACKEND_URL}/api/internal/accounts/page_links`,
      {
        headers: {
          'Session-Id': cookies._square_eight_merchant_session
        }
      }).then((response) => {
        setPageLinks(response.data.page_links)
      }).catch((e) => {
        console.log(e)
      })
    }
    fetchPageLinks()
  }, [cookies._square_eight_merchant_session])

  const completeEdit = () => {
    if (addAtomSelectedBlock) {
      addAtomSelectedBlockFunc()
    } else {
      addAtomNewBlockFunc()
    }
  }

  const addAtomNewBlockFunc = () => {
      let IframeAtomState: IframeAtom
      IframeAtomState = { atomType: 'iframe', src: inputSrc, width: inputWidth, height: inputHeight }
      let blockID = new Date().getTime().toString(16)
      let BlockState: BlockContent
      BlockState = { blockID: blockID, atoms: [IframeAtomState], sortOrder: currentMaxSortOrder + 1 }
      let updatePageContentState: PageContentState = { blockContent: [...pageContent.blockContent, BlockState] }
      dispatch(pageContentChanged(updatePageContentState))
      dispatch(showBlockModalChanged(false))
      dispatch(atomTypeChanged(''))
      dispatch(selectedAtomTypeChanged(''))
      dispatch(currentMaxSortOrderChanged(currentMaxSortOrder + 1))
  }

  const addAtomSelectedBlockFunc = () => {
    let targetBlockContentState: BlockContent | undefined = pageContent.blockContent.find(content => content.blockID === selectedBlockID)
    if (targetBlockContentState !== undefined) {
      let updateAtoms: IframeAtom[] = targetBlockContentState.atoms as IframeAtom[]
      updateAtoms = [...updateAtoms, { atomType: ATOM_TYPE.IFRAME, src: inputSrc, width: inputWidth, height: inputHeight } as IframeAtom]
      let insertBlockContentState: BlockContent = { atoms: updateAtoms, blockID: targetBlockContentState.blockID, sortOrder: targetBlockContentState.sortOrder }
      let filterBlockContents = pageContent.blockContent.filter(content => content.blockID !== insertBlockContentState.blockID)
      let updatePageContentState: PageContentState = { blockContent: [...filterBlockContents, insertBlockContentState] }
      dispatch(pageContentChanged(updatePageContentState))
      dispatch(showBlockModalChanged(false))
      dispatch(blockTypeChanged(''))
      dispatch(atomTypeChanged(''))
      dispatch(selectedAtomTypeChanged(''))
    }
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
          <span>iframeを追加</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <div>src設定</div>
          <Form.Check
            type='radio'
            id='inputSrcTypeCheck'
            name='srcTypeCheck'
            label='URL、パスを入力する'
            checked={inputSrcType === 'inputSrc'}
            onChange={() => setInputSrcType('inputSrc')}
          />
          <Form.Check
            type='radio'
            id='pageLinkSrcTypeCheck'
            name='srcTypeCheck'
            label='SquareEightで作成したページを埋め込む'
            checked={inputSrcType === 'pageLink'}
            onChange={() => setInputSrcType('pageLink')}
          />
          <Form.Control placeholder=''
                        value={inputSrc}
                        onChange={(e) => setInputSrc(e.target.value)}></Form.Control>
          <div>iframeの縦幅を入力してください</div>
          <Form.Control placeholder=''
                        type='number'
                        value={inputHeight}
                        onChange={(e) => setInputHeight(Number(e.target.value))}></Form.Control>
          <div>iframeの横幅を入力してください</div>
          <Form.Control placeholder=''
                        type='number'
                        value={inputWidth}
                        onChange={(e) => setInputWidth(Number(e.target.value))}></Form.Control>
          <div className='mt20'>プレビュー</div>
          <br />
          <div>
            <iframe src={inputSrc} width={inputWidth} height={inputHeight} />
          </div>
        </Form.Group>
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

export default EditIframeAtomModal
