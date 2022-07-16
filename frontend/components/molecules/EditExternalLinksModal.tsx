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
  // 予約ページ/回数券購入ページ/月額課金加入ページ: Registered
  // 手動入力: Manual とする
  const [inputLinkType, setInputLinkType] = useState('Registered')
  const [blockContent, setBlockContent] = useState<ExternalLinkBlockContentStateType[]>([])
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)
  const currentMaxSortOrder = useSelector((state: RootState) => state.homepage.currentMaxSortOrder)

  useEffect(() => {
    const fetchPageLinks = () => {
      axios.get(`${process.env.BACKEND_URL}/api/internal/accounts/page_links`,
      {
        headers: {
          'Session-Id': cookies._gybuilder_merchant_session
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
  }, [cookies._gybuilder_merchant_session])

  const clearInputTextState = () => {
    setInputLinkText('')
    setInputLink('')
  }
  
  const onClickAddLinkButton = () => {
    let updateBlockContent: ExternalLinkBlockContentStateType[]
    updateBlockContent = [...blockContent, {text: inputLinkText, url: inputLink }]
    setBlockContent(updateBlockContent)
    clearInputTextState()
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

  const onChangeExternalLinkSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputLink(event.target.value)
    let text: string
    text = pageLinks.find(link => link?.value === event.target.value)?.text || event.target.selectedOptions[0].label
    setInputLinkText(text)
    // これ↓だと【予約ページ】とかのラベル部分も設定されてしまう
    // setInputLinkText(event.target.selectedOptions[0].label)
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
        label='予約ページ/回数券購入ページ/月額課金加入ページを追加'
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
                  {link.text}&emsp;<span>【{link.label}】</span>
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
