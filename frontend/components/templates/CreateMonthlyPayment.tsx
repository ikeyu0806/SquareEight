import React, { useState, useRef, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Container, FormControl, Row, Col, Form, Button } from 'react-bootstrap'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { ShopParam } from 'interfaces/ShopParam'
import { priceChanged,
         nameChanged,
         reserveIsUnlimitedChanged,
         reserveIntervalNumberChanged,
         reserveIntervalUnitChanged,
         enableReserveCountChanged,
         descriptionChanged,
         publishStatusChanged,
         monthlyPaymentPlanImage1FileChanged,
         monthlyPaymentPlanImage2FileChanged,
         monthlyPaymentPlanImage3FileChanged,
         monthlyPaymentPlanImage4FileChanged,
         monthlyPaymentPlanImage5FileChanged,
         shopsChanged,
         selectedReserveFrameIdsChanged } from 'redux/monthlyPaymentPlanSlice'

interface Props {
  showDeleteButton?: boolean
}

const CreateMonthlyPayment = ({showDeleteButton}: Props): JSX.Element => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const [image, setImage] = useState('')
  const name = useSelector((state: RootState) => state.monthlyPaymentPlan.name)
  const price = useSelector((state: RootState) => state.monthlyPaymentPlan.price)
  const reserveIsUnlimited = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIsUnlimited)
  const reserveIntervalNumber = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalNumber)
  const enableReserveCount = useSelector((state: RootState) => state.monthlyPaymentPlan.enableReserveCount)
  const description = useSelector((state: RootState) => state.monthlyPaymentPlan.description)
  const publishStatus = useSelector((state: RootState) => state.monthlyPaymentPlan.publishStatus)
  const selectedShopIds = useSelector((state: RootState) => state.product.selectedShopIds)
  const shops = useSelector((state: RootState) => state.account.shops)
  const monthlyPaymentPlanImage1ImagePublicUrl = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage1ImagePublicUrl)
  const monthlyPaymentPlanImage2ImagePublicUrl = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage2ImagePublicUrl)
  const monthlyPaymentPlanImage3ImagePublicUrl = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage3ImagePublicUrl)
  const monthlyPaymentPlanImage4ImagePublicUrl = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage4ImagePublicUrl)
  const monthlyPaymentPlanImage5ImagePublicUrl = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage5ImagePublicUrl)
  const selectableReserveFrames =  useSelector((state: RootState) => state.monthlyPaymentPlan.selectableReserveFrames)
  const selectedReserveFrameIds =  useSelector((state: RootState) => state.monthlyPaymentPlan.selectedReserveFrameIds)

  const shopRefs = useRef<any>([])
  shopRefs.current = shops.map((_, i) => shopRefs.current[i] ?? createRef())

  const onChangeTicketMasterImage1File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(monthlyPaymentPlanImage1FileChanged(files[0]))
    }
  }

  const onChangeTicketMasterImage2File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(monthlyPaymentPlanImage2FileChanged(files[0]))
    }
  }

  const onChangeTicketMasterImage3File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(monthlyPaymentPlanImage3FileChanged(files[0]))
    }
  }

  const onChangeTicketMasterImage4File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(monthlyPaymentPlanImage4FileChanged(files[0]))
    }
  }

  const onChangeTicketMasterImage5File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(monthlyPaymentPlanImage5FileChanged(files[0]))
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
        axios.delete(`${process.env.BACKEND_URL}/api/internal/monthly_payment_plans/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '削除しました',
            icon: 'info'
          })
          router.push('/admin/monthly_payment')
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '削除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  const updateShop = (shopRef: number) => {
    let updateShop: ShopParam
    let updateShops: ShopParam[]
    updateShops = []

    updateShop = Object.assign(shops[shopRef])
    shops.map((p, i) => {
      if (i == shopRef) {
        updateShops.push(updateShop)
      } else {
        updateShops.push(p)
      }
    })
    dispatch(shopsChanged(updateShops))
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

  return (
    <>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
          <div className='mt20 mb20'></div>
            <Row>
              <Col sm={8}>
                <h4 className='mt30'>月額サブスクリプション作成</h4>
              </Col>
              {showDeleteButton &&<Col>
                <Button variant='danger' size='sm' onClick={() => execDelete()}>月額サブスクリプションを削除</Button>
              </Col>}
            </Row>
          <Form.Label>プラン名</Form.Label>
          <FormControl
            value={name}
            onChange={(e) => dispatch(nameChanged(e.target.value))}
            placeholder='週2レッスンプラン 受講し放題プランなど'
            aria-label='リソース名' />
          <Form.Label className='mt10'>月額料金</Form.Label>
          <FormControl
            value={String(price)}
            onChange={(e) => dispatch(priceChanged(Number(e.target.value)))}
            placeholder='10000'
            aria-label='10000' />
          <Form.Label className='mt10'>予約可能数{reserveIsUnlimited}</Form.Label>
          <Form.Check 
            type='radio'
            id='unlimited'
            label='無制限'
            onChange={() => dispatch(reserveIsUnlimitedChanged(!reserveIsUnlimited))}
            checked={reserveIsUnlimited} />
          <Form.Check 
            type='radio'
            id='limited'
            label='制限あり'
            onChange={() => dispatch(reserveIsUnlimitedChanged(!reserveIsUnlimited))}
            checked={!reserveIsUnlimited} />
            {!reserveIsUnlimited &&
            <Row>
              <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                <Col sm={2}>
                  <Form.Control value={String(reserveIntervalNumber)}
                                onChange={(e) => dispatch(reserveIntervalNumberChanged(Number(e.target.value)))}
                                placeholder='1' />
                </Col>
                <Col xs={3}>
                  <Form.Select onChange={(e) => dispatch(reserveIntervalUnitChanged(e.target.value))}>
                    <option value='Day'>日に</option>
                    <option value='Week'>週間に</option>
                  </Form.Select>
                </Col>
                <Col sm={2}>
                  <Form.Control value={String(enableReserveCount)}
                                onChange={(e) => dispatch(enableReserveCountChanged(Number(e.target.value)))} />
                </Col>
                <Form.Label column sm={4}>
                  回予約可能
                </Form.Label>
              </Form.Group>
            </Row>}
          <Form.Label className='mt10'>プランの説明</Form.Label>
          <FormControl
            value={description}
            onChange={(e) => dispatch(descriptionChanged(e.target.value))}
            as='textarea'
            rows={20}
            placeholder=''
            aria-label='' />
          <Row>
            <Col>
              <Form.Group className='mt10'>
                <Form.Label>公開設定</Form.Label>
                <Form.Select placeholder='メニュー名'
                  value={publishStatus || 'Unpublish'}
                  onChange={(e) => dispatch(publishStatusChanged(e.target.value))}>
                  <option value='Unpublish'>非公開</option>
                  <option value='Publish'>公開</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
            </Col>
            <Col>
            </Col>
          </Row>

          <Form.Label className='mt10'>回数券イメージ画像1</Form.Label>
          <Form.Control
            onChange={onChangeTicketMasterImage1File}
            type='file' />
          {monthlyPaymentPlanImage1ImagePublicUrl && <img
            className='d-block w-100 mt30'
            src={monthlyPaymentPlanImage1ImagePublicUrl}
            alt='monthlyPaymentPlanImage1File Image'
          />}
          <Form.Label className='mt10'>回数券イメージ画像2</Form.Label>
          <Form.Control
            onChange={onChangeTicketMasterImage2File}
            type='file' />
          {monthlyPaymentPlanImage2ImagePublicUrl && <img
            className='d-block w-100 mt30'
            src={monthlyPaymentPlanImage2ImagePublicUrl}
            alt='monthlyPaymentPlanImage2File Image'
          />}
          <Form.Label className='mt10'>回数券イメージ画像3</Form.Label>
          <Form.Control
            onChange={onChangeTicketMasterImage3File}
            type='file' />
          {monthlyPaymentPlanImage3ImagePublicUrl && <img
            className='d-block w-100 mt30'
            src={monthlyPaymentPlanImage3ImagePublicUrl}
            alt='monthlyPaymentPlanImage3File Image'
          />}
          <Form.Label className='mt10'>回数券イメージ画像4</Form.Label>
          <Form.Control
            onChange={onChangeTicketMasterImage4File}
            type='file' />
          {monthlyPaymentPlanImage4ImagePublicUrl && <img
            className='d-block w-100 mt30'
            src={monthlyPaymentPlanImage4ImagePublicUrl}
            alt='monthlyPaymentPlanImage4File Image'
          />}
          <Form.Label className='mt10'>回数券イメージ画像5</Form.Label>
          <Form.Control
            onChange={onChangeTicketMasterImage5File}
            type='file' />
          {monthlyPaymentPlanImage5ImagePublicUrl && <img
            className='d-block w-100 mt30'
            src={monthlyPaymentPlanImage5ImagePublicUrl}
            alt='monthlyPaymentPlanImage5File Image'
          />}

          <Form.Group className='mt10'>
            <div>店舗設定</div>
            <div className='mt5 mb5'>設定した店舗のページに商品ページへのリンクが表示されます。</div>
            {shops.map((shop, i) => {
              return (
                <Form.Check
                  label={shop.name}
                  id={'shop_' + shop.public_id}
                  name={'shop_check'}
                  onChange={() => updateShop(i)}
                  defaultChecked={selectedShopIds.includes(shop.id)}
                  key={i} />
              )
            })}
          </Form.Group>

          {selectableReserveFrames.length !== 0 && <>
            <hr />
            <Form.Group className='mt10'>
              <div>予約メニュー設定</div>
              <div className='mt5 mb5'>選択した予約メニューに月額サブスクリプション支払いが設定されます。</div>
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
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default CreateMonthlyPayment
