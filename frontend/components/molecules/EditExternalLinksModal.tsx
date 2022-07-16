import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { pageContentChanged, showBlockModalChanged, blockTypeChanged, currentMaxSortOrderChanged } from '../../redux/homepageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { PageContentState } from '../../interfaces/PageContentState'
import { ExternalLinkBlockContentStateType } from '../../types/ExternalLinkBlockStateType'
import { useCookies } from 'react-cookie'
import { PageLinksParam } from 'interfaces/PageLinksParam'
import axios from 'axios'

const EditExternalLinksModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])

  const [pageLinks, setPageLinks] = useState<PageLinksParam[]>([])
  const [inputLinkText, setInputLinkText] = useState('')
  const [inputLink, setInputLink] = useState('')
  const [blockContent, setBlockContent] = useState<ExternalLinkBlockContentStateType[]>([])
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)
  const currentMaxSortOrder = useSelector((state: RootState) => state.homepage.currentMaxSortOrder)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/accounts/page_links`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then((response) => {
      console.log(response)
      setPageLinks(response.data.page_links)
    }).catch((e) => {
      console.log(e)
    })
  }, [cookies._gybuilder_merchant_session])
  
  const onClickAddLinkButton = () => {
    let updateBlockContent: ExternalLinkBlockContentStateType[]
    updateBlockContent = [...blockContent, {text: inputLinkText, url: inputLink }]
    setBlockContent(updateBlockContent)
    setInputLinkText('')
    setInputLink('')
  }

  const completeEdit = () => {
    let updatePageContentState: PageContentState[]
    updatePageContentState = [...pageContent, { blockID: new Date().getTime().toString(16),
                                                blockType: 'externalLinks',
                                                blockState: {content: blockContent},
                                                sortOrder: currentMaxSortOrder + 1}]
    dispatch(pageContentChanged(updatePageContentState.sort(function(a, b) { return a.sortOrder < b.sortOrder ? -1 : 1 })))
    dispatch(showBlockModalChanged(false))
    dispatch(blockTypeChanged(''))
    dispatch(currentMaxSortOrderChanged(currentMaxSortOrder + 1))
  }

  return (
    <>
      <Modal.Header> 
        <Modal.Title>
          <span>ページリンクを追加</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Text>リンク表示名</Form.Text>
            <Form.Control placeholder='企業情報'
                          value={inputLinkText}
                          onChange={(e) => setInputLinkText(e.target.value)}></Form.Control>
            <Form.Text>URL</Form.Text>
            <Form.Control placeholder='https://sample.com'
                          value={inputLink}
                          onChange={(e) => setInputLink(e.target.value)}></Form.Control>
            <Button className='mt20' onClick={onClickAddLinkButton}>追加</Button>
          </Form.Group>
          <br />
          {blockContent.map((json, i) => {
            return (<a href={json.url} className='list-group-item list-group-item-action' target='_blank' rel='noreferrer' key={i}>{json.text}</a>)
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(blockTypeChanged(''))}>戻る</Button>
        <Button variant='secondary' onClick={() => { dispatch(showBlockModalChanged(false)); dispatch(blockTypeChanged(''))}}>閉じる</Button>
        <Button variant='primary' onClick={completeEdit}>編集を終えてブロックを追加</Button>
      </Modal.Footer>
    </>
  )
}

export default EditExternalLinksModal
