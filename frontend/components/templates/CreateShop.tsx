import React, { useRef, createRef } from 'react'
import { FormControl, Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import RequireBadge from 'components/atoms/RequireBadge'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { nameChanged,
         phoneNumberChanged,
         description1Changed,
         description2Changed,
         description3Changed,
         description4Changed,
         description5Changed,
        //  description6Changed,
         postalCodeChanged,
         stateChanged,
         cityChanged,
         townChanged,
         line1Changed,
         line2Changed,
         accessInfoChanged,
         parkingLotGuidanceChanged,
         remarksChanged,
         shopImage1FileChanged,
         shopImage2FileChanged,
         shopImage3FileChanged,
         shopImage4FileChanged,
         shopImage5FileChanged,
         shopImage6FileChanged,
         selectedReserveFrameIdsChanged,
         selectedMonthlyPaymentPlanIdsChanged,
         selectedTicketMasterIdsChanged,
         selectedWebpageIdsChanged,
         selectedProductIdsChanged } from 'redux/shopSlice'

interface Props {
  showDeleteButton?: boolean
}

const CreateShop = ({showDeleteButton}: Props): JSX.Element => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const name = useSelector((state: RootState) => state.shop.name)
  const phoneNumber = useSelector((state: RootState) => state.shop.phoneNumber)
  const description1 = useSelector((state: RootState) => state.shop.description1)
  const description2 =  useSelector((state: RootState) => state.shop.description2)
  const description3 =  useSelector((state: RootState) => state.shop.description3)
  const description4 =  useSelector((state: RootState) => state.shop.description4)
  const description5 =  useSelector((state: RootState) => state.shop.description5)
  // const description6 =  useSelector((state: RootState) => state.shop.description6)
  const postalCode =  useSelector((state: RootState) => state.shop.postalCode)
  const state =  useSelector((state: RootState) => state.shop.state)
  const city =  useSelector((state: RootState) => state.shop.city)
  const town =  useSelector((state: RootState) => state.shop.town)
  const line1 =  useSelector((state: RootState) => state.shop.line1)
  const line2 =  useSelector((state: RootState) => state.shop.line2)
  const accessInfo =  useSelector((state: RootState) => state.shop.accessInfo)
  const parkingLotGuidance =  useSelector((state: RootState) => state.shop.parkingLotGuidance)
  const businessHoursText =  useSelector((state: RootState) => state.shop.businessHoursText)
  const remarks =  useSelector((state: RootState) => state.shop.remarks)
  const shopImage1ImagePublicUrl = useSelector((state: RootState) => state.shop.shopImage1ImagePublicUrl)
  const shopImage2ImagePublicUrl = useSelector((state: RootState) => state.shop.shopImage2ImagePublicUrl)
  const shopImage3ImagePublicUrl = useSelector((state: RootState) => state.shop.shopImage3ImagePublicUrl)
  const shopImage4ImagePublicUrl = useSelector((state: RootState) => state.shop.shopImage4ImagePublicUrl)
  const shopImage5ImagePublicUrl = useSelector((state: RootState) => state.shop.shopImage5ImagePublicUrl)

  const selectedReserveFrameIds = useSelector((state: RootState) => state.shop.selectedReserveFrameIds)
  const reserveFrames = useSelector((state: RootState) => state.shop.reserveFrames)
  const reserveFrameRefs = useRef<any>([])
  reserveFrameRefs.current = reserveFrames.map((_, i) => reserveFrameRefs.current[i] ?? createRef())

  const selectedTicketMasterIds = useSelector((state: RootState) => state.shop.selectedTicketMasterIds)
  const ticketMasters = useSelector((state: RootState) => state.shop.ticketMasters)
  const ticketMasterRefs = useRef<any>([])
  ticketMasterRefs.current = ticketMasters.map((_, i) => ticketMasterRefs.current[i] ?? createRef())

  const selectedMonthlyPaymentPlanIds = useSelector((state: RootState) => state.shop.selectedMonthlyPaymentPlanIds)
  const monthlyPaymentPlans = useSelector((state: RootState) => state.shop.monthlyPaymentPlans)
  const monthlyPaymentPlanRefs = useRef<any>([])
  monthlyPaymentPlanRefs.current = monthlyPaymentPlans.map((_, i) => monthlyPaymentPlanRefs.current[i] ?? createRef())

  const selectedProductIds = useSelector((state: RootState) => state.shop.selectedProductIds)
  const products = useSelector((state: RootState) => state.shop.products)
  const productRefs = useRef<any>([])
  productRefs.current = products.map((_, i) => productRefs.current[i] ?? createRef())

  const onChangeShopImage1File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(shopImage1FileChanged(files[0]))
    }
  }

  const onChangeShopImage2File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(shopImage2FileChanged(files[0]))
    }
  }

  const onChangeShopImage3File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(shopImage3FileChanged(files[0]))
    }
  }

  const onChangeShopImage4File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(shopImage4FileChanged(files[0]))
    }
  }

  const onChangeShopImage5File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(shopImage5FileChanged(files[0]))
    }
  }

  const onChangeShopImage6File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(shopImage6FileChanged(files[0]))
    }
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
        axios.delete(`${process.env.BACKEND_URL}/api/internal/shops/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '削除しました',
            icon: 'info'
          })
          router.push('/admin/shop')
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '削除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  const updateReserveFrameIds = (reserveFrameId: number) => {
    let filterReserveFrameIdIds: number[]
    if (selectedReserveFrameIds.includes(reserveFrameId)) {
      filterReserveFrameIdIds = selectedReserveFrameIds.filter((id) => id !== reserveFrameId)
    } else {
      filterReserveFrameIdIds = [...selectedReserveFrameIds, reserveFrameId]
    }
    dispatch(selectedReserveFrameIdsChanged(filterReserveFrameIdIds))
  }

  const updateTicketMasterIds = (ticketMasterId: number) => {
    let filterTicketMasterIds: number[]
    if (selectedTicketMasterIds.includes(ticketMasterId)) {
      filterTicketMasterIds = selectedTicketMasterIds.filter((id) => id !== ticketMasterId)
    } else {
      filterTicketMasterIds = [...selectedTicketMasterIds, ticketMasterId]
    }
    dispatch(selectedTicketMasterIdsChanged(filterTicketMasterIds))
  }

  const updateMonthlyPaymentPlanIds = (monthlyPaymentPlanId: number) => {
    let filterMonthlyPaymentPlanIds: number[]
    if (selectedMonthlyPaymentPlanIds.includes(monthlyPaymentPlanId)) {
      filterMonthlyPaymentPlanIds = selectedMonthlyPaymentPlanIds.filter((id) => id !== monthlyPaymentPlanId)
    } else {
      filterMonthlyPaymentPlanIds = [...selectedMonthlyPaymentPlanIds, monthlyPaymentPlanId]
    }
    dispatch(selectedMonthlyPaymentPlanIdsChanged(filterMonthlyPaymentPlanIds))
  }

  const updateProductIds = (productId: number) => {
    let filterProductIds: number[]
    if (selectedProductIds.includes(productId)) {
      filterProductIds = selectedProductIds.filter((id) => id !== productId)
    } else {
      filterProductIds = [...selectedProductIds, productId]
    }
    dispatch(selectedProductIdsChanged(filterProductIds))
  }

  return (
    <>
      {showDeleteButton &&
      <Row>
        <Col sm={8}>
        </Col>
        <Col>
          <Button variant='danger' size='sm' onClick={() => execDelete()}>店舗を削除</Button>
        </Col>
      </Row>}
      <h3 className='mb15'>店舗情報登録</h3>
      <div>登録した情報を元に店舗紹介ページが自動生成されます。</div>
      <div className='mt10'>未入力の項目はページに表示されません。</div>
      <div className='mt10'>店舗紹介ページには登録した商品。予約メニュー、回数券、月額課金の紹介とWebページのリンクも挿入されます。</div>
      <hr />
      <Form.Label>店舗名<RequireBadge /></Form.Label>
      <FormControl
        value={name}
        onChange={(e) => dispatch(nameChanged(e.target.value))} />
      <Form.Label
        className='mt10'>店舗説明1</Form.Label>
      <FormControl
        as='textarea' rows={3}
        value={description1}
        onChange={(e) => dispatch(description1Changed(e.target.value))} />
      <Form.Label className='mt10'>店舗説明2</Form.Label>
      <FormControl
        as='textarea' rows={3}
        value={description2}
        onChange={(e) => dispatch(description2Changed(e.target.value))} />
      <Form.Label className='mt10'>店舗説明3</Form.Label>
      <FormControl
        as='textarea' rows={3}
        value={description3}
        onChange={(e) => dispatch(description3Changed(e.target.value))} />
      <Form.Label className='mt10'>店舗説明4</Form.Label>
      <FormControl
        as='textarea' rows={3}
        value={description4}
        onChange={(e) => dispatch(description4Changed(e.target.value))} />
      <Form.Label className='mt10'>店舗説明5</Form.Label>
      <FormControl
        as='textarea' rows={3}
        value={description5}
        onChange={(e) => dispatch(description5Changed(e.target.value))} />
      <hr />
      <div className='mb10'>連絡先</div>
      <Form.Label>電話番号</Form.Label>
      <FormControl
        value={phoneNumber}
        onChange={(e) => dispatch(phoneNumberChanged(e.target.value))} />
      <hr />
      <div className='mb10'>住所</div>
      <Form.Label>郵便番号</Form.Label>
      <FormControl
        value={postalCode}
        onChange={(e) => dispatch(postalCodeChanged(e.target.value))} />
      <Form.Label className='mt10'>都道府県</Form.Label>
      <FormControl
        value={state}
        onChange={(e) => dispatch(stateChanged(e.target.value))} />
      <Form.Label className='mt10'>区市町村</Form.Label>
      <FormControl
        value={city}
        onChange={(e) => dispatch(cityChanged(e.target.value))} />
      <Form.Label className='mt10'>町名（丁目まで）</Form.Label>
      <FormControl
        value={town}
        onChange={(e) => dispatch(townChanged(e.target.value))} />
      <Form.Label className='mt10'>番地、号</Form.Label>
      <FormControl
        value={line1}
        onChange={(e) => dispatch(line1Changed(e.target.value))} />
      <Form.Label className='mt10'>建物・部屋番号・その他</Form.Label>
      <FormControl
        value={line2}
        onChange={(e) => dispatch(line2Changed(e.target.value))} />
      <Form.Label className='mt10'>アクセス情報</Form.Label>
      <FormControl
        value={accessInfo}
        placeholder='〇〇駅〇〇口から徒歩5分など'
        onChange={(e) => dispatch(accessInfoChanged(e.target.value))} />
      <Form.Label className='mt10'>駐車場情報</Form.Label>
      <FormControl
        value={parkingLotGuidance}
        placeholder='有料の駐車場がございます。¥1200〜/日。'
        onChange={(e) => dispatch(parkingLotGuidanceChanged(e.target.value))} />
      <hr />
      <Form.Label className='mt10'>店舗イメージ画像1</Form.Label>
      <Form.Control
        onChange={onChangeShopImage1File}
        type='file' />
      {shopImage1ImagePublicUrl && <img
        className='d-block w-100 mt30'
        src={shopImage1ImagePublicUrl}
        alt='shopImage1File Image'
      />}
      <Form.Label className='mt10'>店舗イメージ画像2</Form.Label>
      <Form.Control
        onChange={onChangeShopImage2File}
        type='file' />
      {shopImage2ImagePublicUrl && <img
        className='d-block w-100 mt30'
        src={shopImage2ImagePublicUrl}
        alt='shopImage2File Image'
      />}
      <Form.Label className='mt10'>店舗イメージ画像3</Form.Label>
      <Form.Control
        onChange={onChangeShopImage3File}
        type='file' />
      {shopImage3ImagePublicUrl && <img
        className='d-block w-100 mt30'
        src={shopImage3ImagePublicUrl}
        alt='shopImage3File Image'
      />}
      <Form.Label className='mt10'>店舗イメージ画像4</Form.Label>
      <Form.Control
        onChange={onChangeShopImage4File}
        type='file' />
      {shopImage4ImagePublicUrl && <img
        className='d-block w-100 mt30'
        src={shopImage4ImagePublicUrl}
        alt='shopImage4File Image'
      />}
      <Form.Label className='mt10'>店舗イメージ画像5</Form.Label>
      <Form.Control
        onChange={onChangeShopImage5File}
        type='file' />
      {shopImage5ImagePublicUrl && <img
        className='d-block w-100 mt30'
        src={shopImage5ImagePublicUrl}
        alt='shopImage5File Image'
      />}
      {/* <Form.Label className='mt10'>店舗イメージ画像6</Form.Label>
      <Form.Control
        onChange={onChangeShopImage6File}
        type='file' /> */}
      <hr />
      <Form.Label className='mt10'>店舗備考</Form.Label>
      <FormControl
        as='textarea' rows={3}
        value={remarks}
        onChange={(e) => dispatch(remarksChanged(e.target.value))} />
      {reserveFrames.length !== 0 &&
      <>
        <hr />
        <div>予約メニュー設定</div>
        <div className='mt5 mb5'>設定した予約メニューのリンクが店舗ページに表示されます。</div>
        {reserveFrames.map((reserveFrame, i) => {
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
      </>}
      {ticketMasters.length !== 0 &&
      <>
        <hr />
        <div>回数券設定</div>
        <div className='mt5 mb5'>設定した回数券のリンクが店舗ページに表示されます。</div>
        {ticketMasters.map((ticketMaster, i) => {
          return (
            <Form.Check
              label={ticketMaster.name}
              id={'ticket_master_' + ticketMaster.public_id}
              name={'ticket_master_check'}
              onChange={() => updateTicketMasterIds(ticketMaster.id)}
              defaultChecked={selectedTicketMasterIds.includes(ticketMaster.id)}
              key={i} />
          )
        })}
      </>}
      {monthlyPaymentPlans.length !== 0 &&
      <>
        <hr />
        <div>月額サブスクリプション設定</div>
        <div className='mt5 mb5'>設定した月額サブスクリプションのリンクが店舗ページに表示されます。</div>
        {monthlyPaymentPlans.map((monthlyPaymentPlan, i) => {
          return (
            <Form.Check
              label={monthlyPaymentPlan.name}
              id={'monthly_payment_plan_' + monthlyPaymentPlan.public_id}
              name={'monthly_payment_plan_check'}
              onChange={() => updateMonthlyPaymentPlanIds(monthlyPaymentPlan.id)}
              defaultChecked={selectedMonthlyPaymentPlanIds.includes(monthlyPaymentPlan.id)}
              key={i} />
          )
        })}
      </>}
      {products.length !== 0 &&
      <>
        <hr />
        <div>商品</div>
        <div className='mt5 mb5'>設定した商品のリンクが店舗ページに表示されます。</div>
        {products.map((product, i) => {
          return (
            <Form.Check
              label={product.name}
              id={'product_' + product.public_id}
              name={'product_check'}
              onChange={() => updateProductIds(Number(product.id))}
              defaultChecked={selectedProductIds.includes(Number(product.id))}
              key={i} />
          )
        })}
      </>}
    </>
  )
}

export default CreateShop
