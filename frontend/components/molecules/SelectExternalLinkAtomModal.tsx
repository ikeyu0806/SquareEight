import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { selectedAtomTypeChanged, atomTypeChanged } from 'redux/webpageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { BLOCK_TYPE } from 'constants/blockType'
import { ATOM_TYPE } from 'constants/atomType'

const SelectExternalLinkAtomModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.webpage.showBlockSample)
  const selectedAtomType = useSelector((state: RootState) => state.webpage.selectedAtomType)

  return (
    <div onClick={() => dispatch(selectedAtomTypeChanged(ATOM_TYPE.EXTERNAL_LINKS))} >
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 type='radio'
                 checked={selectedAtomType === BLOCK_TYPE.EXTERNAL_LINKS} />
          <span>ページリンク</span>
          <div className='mt10'>
            ページリンク集を追加します。<br/>
            SquareEightで作成したWebページ、予約ページ、回数券購入ページ、月額課金加入ページや外部サイトのリンクも設定できます。
          </div>
          {showBlockSample && 
            <>
              <br />
              <hr />
              <ListGroup>
                <ListGroup.Item action href="https://google.com">施設案内</ListGroup.Item>
                <ListGroup.Item>資料請求</ListGroup.Item>
                <ListGroup.Item>運営企業情報</ListGroup.Item>
              </ListGroup>
            </>
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default SelectExternalLinkAtomModal
