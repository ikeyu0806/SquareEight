import React, { useState } from 'react'
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { getBase64 } from '../../functions/getBase64'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { ShopParam } from 'interfaces/ShopParam'
import { nameChanged,
         issueNumberChanged,
         priceChanged,
         effectiveMonthChanged,
         descriptionChanged,
         publishStatusChanged,
         base64ImageChanged,
         shopsChanged } from 'redux/ticketMasterSlice'

interface Props {
  showDeleteButton?: boolean
}

const CreateTicketTemplate = ({showDeleteButton}: Props): JSX.Element => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const [image, setImage] = useState('')
  const name = useSelector((state: RootState) => state.ticketMaster.name)
  const issueNumber = useSelector((state: RootState) => state.ticketMaster.issueNumber)
  const price = useSelector((state: RootState) => state.ticketMaster.price)
  const effectiveMonth = useSelector((state: RootState) => state.ticketMaster.effectiveMonth)
  const description = useSelector((state: RootState) => state.ticketMaster.description)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.monthlyPaymentPlan.s3ObjectPublicUrl)
  const publishStatus = useSelector((state: RootState) => state.monthlyPaymentPlan.publishStatus)
  const selectedShopIds = useSelector((state: RootState) => state.product.selectedShopIds)
  const shops = useSelector((state: RootState) => state.account.shops)

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
        axios.delete(`${process.env.BACKEND_URL}/api/internal/ticket_masters/${router.query.ticket_master_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '削除しました',
            icon: 'info'
          })
          router.push('/admin/ticket')
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '削除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => dispatch(base64ImageChanged(data))
    )
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

  return (
    <>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <div className='mt20 mb20'>
            <Row>
              <Col sm={9}>
                <h2 className='mt30'>回数券作成</h2>
              </Col>
              {showDeleteButton && <Col>
                <Button variant='danger' size='sm' onClick={() => execDelete()}>回数券を削除</Button>
              </Col>}
            </Row>
              <Form.Group className='mb-3'>
                <Form.Label>表示名</Form.Label>
                <Form.Control placeholder='レッスン10回受講券など'
                              onChange={(e) => dispatch(nameChanged(e.target.value))}
                              value={name} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>発行枚数</Form.Label>
                <Form.Control placeholder='発行枚数'
                              onChange={(e) => dispatch(issueNumberChanged(Number(e.target.value)))}
                              value={String(issueNumber)} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>値段</Form.Label>
                <Form.Control placeholder='値段'
                              onChange={(e) => dispatch(priceChanged(Number(e.target.value)))}
                              value={String(price)} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>有効月数</Form.Label>
                <Form.Control placeholder='有効月数'
                              type='number'
                              onChange={(e) => dispatch(effectiveMonthChanged(Number(e.target.value)))}
                              value={effectiveMonth} />
              </Form.Group>
              <Form.Group className='mb-3'>
              <Form.Label className='mt10'>回数券の説明</Form.Label>
              <FormControl
                value={description}
                onChange={(e) => dispatch(descriptionChanged(e.target.value))}
                as='textarea'
                rows={20}
                placeholder=''
                aria-label='' />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label>公開設定</Form.Label>
                    <Form.Select
                      placeholder='メニュー名'
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
              {image && <img
                className='d-block w-100 mt30'
                src={image}
                alt='image'
              />}
              {s3ObjectPublicUrl && !image && <img
                className='d-block w-100 mt30'
                src={s3ObjectPublicUrl}
                alt='image'
              />}
              <Form.Group>
                <Form.Label className='mt10'>イメージ画像</Form.Label>
                <Form.Control type='file' onChange={handleChangeFile} />
              </Form.Group>
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
            </div>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CreateTicketTemplate
