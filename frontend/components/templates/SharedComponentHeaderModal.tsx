import React, { useState } from 'react'
import MerchantCustomNavbar from 'components/molecules/MerchantCustomNavbar'
import { Modal, Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { getBase64 } from 'functions/getBase64'
import SharedComponentHeaderForm from 'components/organisms/SharedComponentHeaderForm'
import { showHeaderEditModalChanged,
         navbarBrandImageChanged } from 'redux/sharedComponentSlice'

const SharedComponentHeaderModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [image, setImage] = useState('')
  const showHeaderEditModal =  useSelector((state: RootState) => state.sharedComponent.showHeaderEditModal)

  return (
    <>
      <Modal show={showHeaderEditModal} size='lg'>
        <Modal.Header>ヘッダ編集</Modal.Header>
        <Modal.Body>
          <SharedComponentHeaderForm></SharedComponentHeaderForm>
          <hr />
          <h3>プレビュー</h3>
          <hr />
          <MerchantCustomNavbar></MerchantCustomNavbar>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => console.log('')}>
            登録する
          </Button>
          <Button variant='secondary' onClick={() => dispatch(showHeaderEditModalChanged(false))}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SharedComponentHeaderModal
