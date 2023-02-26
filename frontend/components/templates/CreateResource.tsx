import React from 'react'
import { FormControl, Form, Row, Col, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { nameChanged,
         descriptionChanged,
         quantityChanged,
         shopsChanged,
         selectedShopIdsChanged,
         selectedReserveFrameIdsChanged,
         resourceImage1FileChanged,
         resourceImage2FileChanged,
         resourceImage3FileChanged,
         resourceImage4FileChanged,
         resourceImage5FileChanged,
         isShowReservePageChanged,
         resourceTypeChanged } from 'redux/resourceSlice'
interface Props {
  showDeleteButton?: boolean
}

const CreateResource = ({showDeleteButton}: Props): JSX.Element => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const name = useSelector((state: RootState) => state.resource.name)
  const description = useSelector((state: RootState) => state.resource.description)
  const resourceImage1File = useSelector((state: RootState) => state.resource.resourceImage1File)
  const resourceImage1PublicUrl = useSelector((state: RootState) => state.resource.resourceImage1PublicUrl)
  const resourceImage2File = useSelector((state: RootState) => state.resource.resourceImage2File)
  const resourceImage2PublicUrl = useSelector((state: RootState) => state.resource.resourceImage2PublicUrl)
  const resourceImage3File = useSelector((state: RootState) => state.resource.resourceImage3File)
  const resourceImage3PublicUrl = useSelector((state: RootState) => state.resource.resourceImage3PublicUrl)
  const resourceImage4File = useSelector((state: RootState) => state.resource.resourceImage4File)
  const resourceImage4PublicUrl = useSelector((state: RootState) => state.resource.resourceImage4PublicUrl)
  const resourceImage5File = useSelector((state: RootState) => state.resource.resourceImage5File)
  const resourceImage5PublicUrl = useSelector((state: RootState) => state.resource.resourceImage5PublicUrl)
  const quantity = useSelector((state: RootState) => state.resource.quantity)
  const resourceType =  useSelector((state: RootState) => state.resource.resourceType)
  const selectedShopIds =  useSelector((state: RootState) => state.resource.selectedShopIds)
  const shops =  useSelector((state: RootState) => state.account.shops)
  const selectableReserveFrames =  useSelector((state: RootState) => state.resource.selectableReserveFrames)
  const selectedReserveFrameIds =  useSelector((state: RootState) => state.resource.selectedReserveFrameIds)
  const isShowReservePage =  useSelector((state: RootState) => state.resource.isShowReservePage)

  const onChangeImage1File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(resourceImage1FileChanged(files[0]))
    }
  }

  const onChangeImage2File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(resourceImage2FileChanged(files[0]))
    }
  }

  const onChangeImage3File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(resourceImage3FileChanged(files[0]))
    }
  }

  const onChangeImage4File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(resourceImage4FileChanged(files[0]))
    }
  }

  const onChangeImage5File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(resourceImage5FileChanged(files[0]))
    }
  }

  const updateShopIds = (shopId: number) => {
    let filterShopIdIds: number[]
    if (selectedShopIds.includes(shopId)) {
      filterShopIdIds = selectedShopIds.filter((id) => id !== shopId)
    } else {
      filterShopIdIds = [...selectedShopIds, shopId]
    }
    dispatch(selectedShopIdsChanged(filterShopIdIds))
  }

  const updateReserveFrameIds = (reserveFrameId: number) => {
    let filterReserveFrameIds: number[]
    if (selectedReserveFrameIds.includes(reserveFrameId)) {
      filterReserveFrameIds = selectedReserveFrameIds.filter((id) => id !== reserveFrameId)
    } else {
      filterReserveFrameIds = [...selectedReserveFrameIds, reserveFrameId]
    }
    dispatch(selectedReserveFrameIdsChanged(filterReserveFrameIds))
  }

  const execDelete = () => {
    swalWithBootstrapButtons.fire({
      title: '削除します',
      html: `${name}を削除します。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/resources/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '削除しました',
            icon: 'info'
          })
          router.push('/admin/resource')
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '削除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <>
      <div className='text-center mt20 mb20'>
        <h3 className='mb15'>リソース登録</h3>
        <span>スタッフや設備・備品を登録して予約者数を制限することができます。</span>
      </div>
      {showDeleteButton &&
      <Row>
        <Col sm={8}>
        </Col>
        <Col>
          <Button variant='danger' size='sm' onClick={() => execDelete()}>リソースを削除</Button>
        </Col>
      </Row>}
      <Form.Label>リソース名</Form.Label>
      <FormControl
        value={name}
        onChange={(e) => dispatch(nameChanged(e.target.value))}
        placeholder=''
        aria-label='リソース名' />
      <Form.Label className='mt10'>説明</Form.Label>
      <Form.Control
        as='textarea'
        rows={10}
        onChange={(e) => dispatch(descriptionChanged(e.target.value))}></Form.Control>

      <Form.Label className='mt10'>イメージ画像1</Form.Label>
      {resourceImage1PublicUrl && <img
        className='d-block w-100 mt30'
        src={resourceImage1PublicUrl}
        alt='resourceImage1File Image'
      />}
      <Form.Control type='file' onChange={onChangeImage1File} />
    
      <Form.Label className='mt10'>イメージ画像2</Form.Label>
      {resourceImage2PublicUrl && <img
        className='d-block w-100 mt30'
        src={resourceImage2PublicUrl}
        alt='resourceImage2File Image'
      />}
      <Form.Control type='file' onChange={onChangeImage2File} />
    
      <Form.Label className='mt10'>イメージ画像3</Form.Label>
      {resourceImage3PublicUrl && <img
        className='d-block w-100 mt30'
        src={resourceImage3PublicUrl}
        alt='resourceImage3File Image'
      />}
      <Form.Control type='file' onChange={onChangeImage3File} />
  
      <Form.Label className='mt10'>イメージ画像4</Form.Label>
      {resourceImage4PublicUrl && <img
        className='d-block w-100 mt30'
        src={resourceImage4PublicUrl}
        alt='resourceImage4File Image'
      />}
      <Form.Control type='file' onChange={onChangeImage4File} />
    
      <Form.Label className='mt10'>イメージ画像5</Form.Label>
      {resourceImage5PublicUrl && <img
        className='d-block w-100 mt30'
        src={resourceImage5PublicUrl}
        alt='resourceImage5File Image'
      />}
      <Form.Control type='file' onChange={onChangeImage5File} />


      <Form.Label className='mt10'>予約受付数</Form.Label>
      <FormControl
        value={quantity}
        type='number'
        onChange={(e) => dispatch(quantityChanged(Number(e.target.value)))}
        placeholder=''
        aria-label='月額料金' />
      <hr />
      <div className='mt10'>種別設定</div>
      <div className='mt5 mb10'>店舗ページ、予約ページの表示に使用されます。</div>
      <Form.Select
        value={resourceType}
        onChange={(e) => dispatch(resourceTypeChanged(e.target.value))}>
        <option value='Staff'>スタッフ</option>
        <option value='Equipment'>設備・備品</option>
        {/* <option value='Others'>その他</option> */}
      </Form.Select>
      {shops.length !== 0 && <>
        <hr />
        <Form.Group className='mt10'>
          <div>店舗設定</div>
          <div className='mt5 mb5'>設定した店舗のページにリソース情報が表示されます。</div>
          {shops.map((shop, i) => {
            return (
              <Form.Check
                label={shop.name}
                id={'shop_' + shop.public_id}
                name={'shop_check'}
                onChange={() => updateShopIds(shop.id)}
                defaultChecked={selectedShopIds.includes(shop.id)}
                key={i} />
            )
          })}
        </Form.Group>
      </>}
      <hr />
      <div>予約メニュー表示設定</div>
      <div className='mt10 mb10'>表示設定すると予約ページにリソース情報が表示されます。</div>
      <Form.Check 
        type='checkbox'
        id='showReserveFramePage'
        label='予約メニューに表示する'
        checked={isShowReservePage}
        onChange={() => dispatch(isShowReservePageChanged(!isShowReservePage))}
      />
      {selectableReserveFrames.length !== 0 && <>
        <hr />
        <Form.Group className='mt10'>
          <div>予約メニュー設定</div>
          <div className='mt5 mb5'>選択した予約メニューに対してリソースの予約受付数制限が反映されます。</div>
          {selectableReserveFrames.map((reserveFrame, i) => {
            return (
              <Form.Check
                label={reserveFrame.title}
                id={'reserve_frame_' + reserveFrame.public_id}
                name={'reserve_frame_check'}
                onChange={() => updateReserveFrameIds(Number(reserveFrame.id))}
                defaultChecked={selectedReserveFrameIds.includes(Number(reserveFrame.id))}
                key={i} />
            )
          })}
        </Form.Group>
      </>}
    </>
  )
}

export default CreateResource
