import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Card, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { StripePaymentMethodsParam } from 'interfaces/StripePaymentMethodsParam'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useDispatch, useSelector } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'
import { RootState } from 'redux/store'

const CardList: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const dispatch = useDispatch()
  const [paymentMethods, setPaymentMethods] = useState<StripePaymentMethodsParam[]>()
  const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState('')
  const allowUpdateCreditCard = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateCreditCard)

  useEffect(() => {
    const fetchCustomerId = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/accounts/payment_methods`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        const paymentMethodsResponse: StripePaymentMethodsParam[] = response.data.payment_methods
        setPaymentMethods(paymentMethodsResponse)
        setDefaultPaymentMethodId(response.data.default_payment_method_id)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchCustomerId()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

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
        axios.post(`${process.env.BACKEND_URL}/api/internal/accounts/${payment_method_id}/update_payment_method`,
        {},
        {
          headers: {
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          dispatch(alertChanged({message: 'お支払いカードを変更しました', show: true}))
          router.push('/admin/payment_method')
        }).catch(error => {
          dispatch(alertChanged({message: "登録失敗しました", show: true, type: 'danger'}))
        })
      }
    })
  }

  const deleteCard = (payment_method_id: string) => {
    swalWithBootstrapButtons.fire({
      title: '削除します',
      text: '削除してもよろしいですか？',
      icon: 'question',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/accounts/${payment_method_id}/detach_stripe_payment_method`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        })
        router.push('/admin/payment_method')
      }
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        <br />
        {allowUpdateCreditCard === 'Allow' && <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={8}>
              <h2>決済方法</h2>
              <Card>
                <Card.Header>クレジットカード一覧</Card.Header>
                <Card.Body>
                  <Card.Text>
                    {
                    !paymentMethods?.length && <>カードが登録されていません</>
                    }
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
                                    &emsp;
                                    <Button variant='danger' size='sm' onClick={() => deleteCard(pay.id)}>削除する</Button>
                                  </>}
                            </ListGroup.Item>
                          )
                        })}
                      </ListGroup>
                      }
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>}
      </MerchantUserAdminLayout>
    </>
  )
}

export default CardList
