import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, ListGroup } from 'react-bootstrap'
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
import { ExternalLinkTextWithUrl } from 'interfaces/PageContentState'
import { ExternalLinkBlockStateType } from 'interfaces/PageContentState'
import { useCookies } from 'react-cookie'
import { PageLinksParam } from 'interfaces/PageLinksParam'
import { BlockContent } from 'interfaces/PageContentState'
import { ATOM_TYPE } from 'constants/atomType'
import axios from 'axios'

const EditExternalLinksAtomModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const [pageLinks, setPageLinks] = useState<PageLinksParam[]>([])
  const [inputLinkText, setInputLinkText] = useState('')
  const [inputLink, setInputLink] = useState('')
  // 予約ページ/回数券購入ページ/月額課金加入ページ: Registered
  // 手動入力: Manual とする
  const [inputLinkType, setInputLinkType] = useState('Registered')
  const [blockContent, setBlockContent] = useState<ExternalLinkTextWithUrl[]>([])
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
        // 最初の値を初期値にする
        setInputLink(response.data.page_links[0].value)
        setInputLinkText(response.data.page_links[0].text)
      }).catch((e) => {
        console.log(e)
      })
    }
    fetchPageLinks()
  }, [cookies._square_eight_merchant_session])

  const clearInputTextState = () => {
    setInputLinkText('')
    setInputLink('')
  }
  
  const onClickAddLinkButton = () => {
    let updateBlockContent: ExternalLinkTextWithUrl[]
    updateBlockContent = [...blockContent, {text: inputLinkText, url: inputLink }]
    setBlockContent(updateBlockContent)
    clearInputTextState()
  }

  const completeEdit = () => {
    if (addAtomSelectedBlock) {
      addAtomSelectedBlockFunc()
    } else {
      addAtomNewBlockFunc()
    }
  }

  const addAtomNewBlockFunc = () => {
    let updateExternalLinkBlockStateType: ExternalLinkBlockStateType = {atomType: ATOM_TYPE.EXTERNAL_LINKS, content: blockContent }
    let BlockState: BlockContent
    let blockID = new Date().getTime().toString(16)
    BlockState = { blockID: blockID, atoms: [updateExternalLinkBlockStateType], sortOrder: currentMaxSortOrder + 1 }
    let updatePageContentState: PageContentState = { blockContent: [...pageContent.blockContent, BlockState] }
    dispatch(pageContentChanged(updatePageContentState))
    dispatch(showBlockModalChanged(false))
    dispatch(blockTypeChanged(''))
    dispatch(atomTypeChanged(''))
    dispatch(selectedAtomTypeChanged(''))
    dispatch(currentMaxSortOrderChanged(currentMaxSortOrder + 1))
  }

  const addAtomSelectedBlockFunc = () => {
    let targetBlockContentState: BlockContent | undefined = pageContent.blockContent.find(content => content.blockID === selectedBlockID)
    if (targetBlockContentState !== undefined) {
      let updateAtoms: ExternalLinkBlockStateType[] = targetBlockContentState.atoms as ExternalLinkBlockStateType[]
      updateAtoms = [...updateAtoms, { atomType: ATOM_TYPE.EXTERNAL_LINKS, content: blockContent } as ExternalLinkBlockStateType]
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

  const onChangeExternalLinkSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputLink(event.target.value)
    let text: string
    text = pageLinks.find(link => link?.value === event.target.value)?.text || event.target.selectedOptions[0].label
    setInputLinkText(text)
    // これ↓だと【予約ページ】とかのラベル部分も設定されてしまう
    // setInputLinkText(event.target.selectedOptions[0].label)
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
          <span>ページリンクを追加</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Check
        type='radio'
        label='SquareEightで作成したWebページ/予約ページ/回数券購入ページ/月額課金加入ページを追加'
        onChange={() => setInputLinkType('Registered')}
        checked={inputLinkType === 'Registered'}></Form.Check>
      <Form.Check
        type='radio'
        label='URLを直接入力'
        onChange={() => {
          setInputLinkType('Manual');
          clearInputTextState();
        }}
        checked={inputLinkType === 'Manual'}></Form.Check>
        <Form>
          <Form.Group>
            {inputLinkType === 'Registered'
            && <Form.Select onChange={(e) => onChangeExternalLinkSelect(e)}>
            {pageLinks.map((link, i) => {
              return (
                <option key={i} value={link.value}>
                  {link.text}&emsp;【{link.label}】
                </option>
              )
            })}
          </Form.Select>}
          {inputLinkType === 'Manual'
          && <><Form.Text>リンク表示名</Form.Text>
            <Form.Control placeholder='企業情報'
                          value={inputLinkText}
                          onChange={(e) => setInputLinkText(e.target.value)}></Form.Control>
            <Form.Text>URL</Form.Text>
            <Form.Control placeholder='https://sample.com'
                          value={inputLink}
                          onChange={(e) => setInputLink(e.target.value)}></Form.Control></>}
            <Button className='mt20' onClick={onClickAddLinkButton}>追加</Button>
          </Form.Group>
          <h5 className='mt20'>プレビュー</h5>
          <br />
          <ListGroup>
            {blockContent.map((json, i) => {
              return (<a href={json.url} className='list-group-item list-group-item-action' target='_blank' rel='noreferrer' key={i}>{json.text}</a>)
            })}
          </ListGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={execBack}>戻る</Button>
        <Button variant='secondary' onClick={closeModal}>閉じる</Button>
        <Button variant='primary' onClick={completeEdit}>編集を終えてブロックを追加</Button>
      </Modal.Footer>
    </>
  )
}

export default EditExternalLinksAtomModal
