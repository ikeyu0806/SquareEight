import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged } from '../../redux/homepageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import PencilAquareIcon from '../atoms/PencilAquareIcon'

type BlockType = {
  text: string
  url: string
}

const EditExternalLinksModal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [inputLinkText, setInputLinkText] = useState('')
  const [inputLink, setInputLink] = useState('')
  const showBlockModal = useSelector((state: RootState) => state.homepage.showBlockModal)
  const [selectedBlockedType, setSelectedBlockedType] = useState('')
  const [blockContent, setBlockContent] = useState<BlockType[]>([])

  const onClickAddLinkButton = () => {
    let updateBlockContent: BlockType[]
    updateBlockContent = [...blockContent, {text: inputLinkText, url: inputLink}]
    setBlockContent(updateBlockContent)
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
            店舗案内
            <PencilAquareIcon width={20} height={20} fill={'#0000FF'} />
          </h4>
          {blockContent.map((json, i) => {
            return (<a href={json.url} className="list-group-item list-group-item-action" target="_blank" rel="noreferrer" key={i}>{json.text}</a>)
          })}
         
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => { dispatch(showBlockModalChanged(false)); dispatch(blockTypeChanged(''))}}>閉じる</Button>
        <Button variant='primary' onClick={() => dispatch(blockTypeChanged(selectedBlockedType))}>編集を終えてブロックを追加</Button>
      </Modal.Footer>
    </>
  )
}

export default EditExternalLinksModal
