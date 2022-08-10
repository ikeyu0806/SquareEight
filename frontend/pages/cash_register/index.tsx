import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, ListGroup, Button, Form} from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { DeliveryTargetParam } from 'interfaces/DeliveryTargetParam'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import { paymentMethodsChanged, defaultPaymentMethodIdChanged } from 'redux/currentEndUserSlice'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { alertChanged } from 'redux/alertSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [currentEndUserId, setCurrentEndUserId] = useState()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const [totalPrice, setTotalPrice] = useState(0)
  const [isRegisteredAddress, setIsRegisteredAddress] = useState(true)
  const paymentMethods = useSelector((state: RootState) => state.currentEndUser.paymentMethods)
  const [deliveryTargets, setDeliveryTargets] = useState<DeliveryTargetParam[]>([])
  const defaultPaymentMethodId = useSelector((state: RootState) => state.currentEndUser.defaultPaymentMethodId)

  useEffect(() => {
    const fetchProduct = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/cash_registers`, {
          headers: {
            'Session-Id': cookies._gybuilder_end_user_session
          }
        }
      )
      .then(function (response) {
        setCurrentEndUserId(response.data.current_end_user_id)
        setTotalPrice(response.data.total_price)
        dispatch(defaultPaymentMethodIdChanged(response.data.default_payment_method_id))
        dispatch(paymentMethodsChanged(response.data.payment_methods))
        setDeliveryTargets(response.data.delivery_targets)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProduct()
  }, [cookies._gybuilder_end_user_session])

  const updateDefaultCard = (payment_method_id: string) => {
    swalWithBootstrapButtons.fire({
      title: 'お支払いカードを更新します',
      text: '更新してもよろしいですか？',
      icon: 'question',
      confirmButtonText: '更新する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.BACKEND_URL}/api/internal/end_users/${payment_method_id}/update_payment_method`,
        {},
        {
          headers: {
            'Session-Id': cookies._gybuilder_end_user_session
          }
        }).then(response => {
          dispatch(alertChanged({message: 'お支払いカードを変更しました', show: true}))
          location.reload()
        }).catch(error => {
          dispatch(alertChanged({message: "登録失敗しました", show: true, type: 'danger'}))
        })
      }
    })
  }

  const updateDefaultDeliveryTarget = (delivery_target_id: string) => {
    swalWithBootstrapButtons.fire({
      title: 'お届け先を更新します',
      text: '更新してもよろしいですか？',
      icon: 'question',
      confirmButtonText: '更新する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.BACKEND_URL}/api/internal/delivery_targets/${delivery_target_id}/update_default`,
        {},
        {
          headers: {
            'Session-Id': cookies._gybuilder_end_user_session
          }
        }).then(response => {
          dispatch(alertChanged({message: 'お支払いカードを変更しました', show: true}))
          location.reload()
        }).catch(error => {
          dispatch(alertChanged({message: "登録失敗しました", show: true, type: 'danger'}))
        })
      }
    })
  }

  return (
    <EndUserLoginLayout>
      <Container>
        <Row>
          <Col lg={2} md={1}></Col>
          <Col lg={5} md={6}>
            <Card>
              <Card.Header>レジ</Card.Header>
              <Card.Body>
              <hr className='mt40' />
                  <h4 className='mt20'>お支払い方法</h4>
                  {<ListGroup>
                      {paymentMethods?.map((pay, i) => {
                        return (
                          <ListGroup.Item key={i}>
                            {pay.card.brand}（************{pay.card.last4} / 有効期限 {pay.card.exp_month} / {pay.card.exp_year}
                            {defaultPaymentMethodId === pay.id && <><br/><span className='badge bg-info'>お支払いカードに設定されています</span></>}
                            {defaultPaymentMethodId !== pay.id
                              &&
                                <>
                                  <br/>
                                  <Button size='sm' onClick={() => updateDefaultCard(pay.id)}>お支払いカードに設定する</Button>
                                </>}
                          </ListGroup.Item>
                        )
                      })}
                   </ListGroup>}
                   <hr className='mt40' />
                  <h4 className='mt20'>お届け先</h4>
                  <Form.Check type='radio'
                              checked={isRegisteredAddress}
                              onClick={() => setIsRegisteredAddress(true)}
                              label='登録住所にお届け'></Form.Check >
                  <Form.Check type='radio'
                              checked={!isRegisteredAddress}
                              onClick={() => setIsRegisteredAddress(false)}
                              label='新規に入力する'></Form.Check >
                  {isRegisteredAddress
                   &&
                   deliveryTargets
                    &&
                    <ListGroup className='mt20'>
                      {deliveryTargets?.map((target, i) => {
                        return (
                          <ListGroup.Item key={i}>
                            〒{target.postal_code} {target.last_name}{target.first_name}<br />
                            {target.state}{target.city}{target.town}{target.line1}{target.line2}
                            {target.is_default 
                            ? <><span className='badge bg-info ml10'>お届け先に設定されています </span></>
                            : <>
                                <Button size='sm'
                                        className='ml10'
                                        onClick={() => updateDefaultDeliveryTarget(target.id)}>お届け先に設定する</Button>
                              </>}
                          </ListGroup.Item>
                        )
                      })}
                    </ListGroup>
                    }
                  {!deliveryTargets
                    && <div className='mb30 mt20'>お届け先が登録されていません
                        <br /><a href={`/customer_page/user/${currentEndUserId}/edit`}>ユーザ編集</a>から登録をお願いします。
                      </div>}
              </Card.Body>
              </Card>
          </Col>
          <Col lg={2} md={5}>
            <Card>
              <Card.Body>
                ご請求額: ￥{totalPrice}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </EndUserLoginLayout>
  )
}

export default Index
