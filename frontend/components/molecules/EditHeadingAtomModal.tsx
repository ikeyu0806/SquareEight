import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { pageContentChanged,
         showBlockModalChanged,
         atomTypeChanged,
         selectedAtomTypeChanged,
         currentMaxSortOrderChanged } from 'redux/webpageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { PageContentState } from 'interfaces/PageContentState'
import { placementType, headingSizeType } from 'interfaces/PageContentState'
import { BLOCK_TYPE } from 'constants/blockType'
import { HeadingAtom } from 'interfaces/PageContentState'
import { BlockContent } from 'interfaces/PageContentState'

const EditHeadingAtomModal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [inputHeading, setInputeHeading] = useState('')
  const [placement, setPlacement] = useState<placementType>('left')
  const [headingSize, setHeadingSize] = useState<headingSizeType>(1)
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)
  const currentMaxSortOrder = useSelector((state: RootState) => state.webpage.currentMaxSortOrder)

  const completeEdit = () => {
    let HeadingAtomState: HeadingAtom
    HeadingAtomState = { text: inputHeading, placement: placement, size: headingSize }
    let BlockContent: BlockContent
    let blockID = new Date().getTime().toString(16)
    let BlockState: BlockContent
    BlockState = { blockID: blockID, content: [HeadingAtomState], sortOrder: currentMaxSortOrder + 1 }
    let updatePageContentState: PageContentState = { blockContent: [...pageContent.blockContent, BlockState] }
    dispatch(pageContentChanged(updatePageContentState))
    dispatch(showBlockModalChanged(false))
    dispatch(atomTypeChanged(''))
    dispatch(selectedAtomTypeChanged(''))
    dispatch(currentMaxSortOrderChanged(currentMaxSortOrder + 1))
  }

  return (
    <>
      <Modal.Header> 
        <Modal.Title>
          <span>テキストを追加</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Text>見出しの表示内容を入力してください</Form.Text>
            <Form.Control placeholder=''
                          value={inputHeading}
                          onChange={(e) => setInputeHeading(e.target.value)}></Form.Control>
            <Form.Text className='mt20'>サイズを選択してください 1が最大です</Form.Text>
            <br />
            {[1, 2, 3, 4, 5, 6].map((size, i) => {
              return (
                <Form.Check
                  key={i}
                  inline
                  label={String(size)}
                  name={'heading' + String(size)}
                  type='radio'
                  checked={headingSize === size}
                  onChange={() => setHeadingSize(size as headingSizeType)}
                />
              )
            })}
            <br />
            <Form.Text className='mt20'>位置を選択してください</Form.Text>
            <br />
            <Form.Check
              inline
              label='左寄せ'
              name='left'
              type='radio'
              checked={placement === ('left')}
              onChange={() => setPlacement('left' as placementType)}
            />
            <Form.Check
              inline
              label='中央'
              name='heading2'
              type='radio'
              checked={placement === ('center')}
              onChange={() => setPlacement('center' as placementType)}
            />
          </Form.Group>
        </Form>
        <div className='mt20'>プレビュー</div>
        <br />
        <div className={placement === 'left' ? 'text-left' : placement === 'center' ? 'text-center' : 'text-right'}>
          {headingSize === 1 && <h1>{inputHeading}</h1>}
          {headingSize === 2 && <h2>{inputHeading}</h2>}
          {headingSize === 3 && <h3>{inputHeading}</h3>}
          {headingSize === 4 && <h4>{inputHeading}</h4>}
          {headingSize === 5 && <h5>{inputHeading}</h5>}
          {headingSize === 6 && <h6>{inputHeading}</h6>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary'
                onClick={() =>{
                  dispatch(atomTypeChanged(''))
                  dispatch(selectedAtomTypeChanged(''))
                }}>戻る</Button>
        <Button variant='secondary'
                onClick={() => {
                  dispatch(showBlockModalChanged(false))
                  dispatch(selectedAtomTypeChanged(''))
                  dispatch(atomTypeChanged(''))}}>閉じる</Button>
        <Button variant='primary' onClick={completeEdit}>編集を終えてブロックを追加</Button>
      </Modal.Footer>
    </>
  )
}

export default EditHeadingAtomModal
