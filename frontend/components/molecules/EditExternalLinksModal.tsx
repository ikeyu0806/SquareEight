import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { pageContentChanged, showBlockModalChanged, blockTypeChanged } from '../../redux/homepageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import PencilAquareIcon from '../atoms/PencilAquareIcon'
import { PageContentState } from '../../interfaces/PageContentState'
import { BlockStateType, BlockContentStateType } from '../../interfaces/BlockStateType'

const EditExternalLinksModal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [inputTitle, setInputTitle] = useState('')
  const [inputLinkText, setInputLinkText] = useState('')
  const [inputLink, setInputLink] = useState('')
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)
  const [blockContent, setBlockContent] = useState<BlockContentStateType[]>([])

  const onClickAddLinkButton = () => {
    let updateBlockContent: BlockContentStateType[]
    updateBlockContent = [...blockContent, {text: inputLinkText, url: inputLink}]
    setBlockContent(updateBlockContent)
    setInputLinkText('')
    setInputLink('')
  }

  const completeEdit = () => {
    let updatePageContentState: PageContentState[]
    updatePageContentState = [...pageContent, {blockType: 'externalLinks', blockState: {title: inputTitle, content: blockContent}}]
    dispatch(pageContentChanged(updatePageContentState))
    dispatch(showBlockModalChanged(false))
    dispatch(blockTypeChanged(''))
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
          <h4>
            {inputTitle}
            <PencilAquareIcon width={20} height={20} fill={'#0000FF'} />
          </h4>
          <Form.Control onChange={(e) => setInputTitle(e.target.value)}></Form.Control>
          {blockContent.map((json, i) => {
            return (<a href={json.url} className="list-group-item list-group-item-action" target="_blank" rel="noreferrer" key={i}>{json.text}</a>)
          })}
         
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => { dispatch(showBlockModalChanged(false)); dispatch(blockTypeChanged(''))}}>閉じる</Button>
        <Button variant='primary' onClick={completeEdit}>編集を終えてブロックを追加</Button>
      </Modal.Footer>
    </>
  )
}

export default EditExternalLinksModal
