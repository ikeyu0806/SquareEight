import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Card, Button, Row, Col, ListGroup } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { StripePaymentMethodsParam } from 'interfaces/StripePaymentMethodsParam'
import { alertChanged } from 'redux/alertSlice'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const CardList: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const dispatch = useDispatch()
  const router = useRouter()
  const [paymentMethods, setPaymentMethods] = useState<StripePaymentMethodsParam[]>()
  const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState('')

  useEffect(() => {
    const fetchPaymentMethod = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/end_users/payment_methods`, {
          headers: { 
            'Session-Id': cookies._gybuilder_end_user_session
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
    fetchPaymentMethod()
  }, [router.query.id, cookies._gybuilder_end_user_session])

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
          router.push('/customer_page/payment_method')
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
        axios.delete(`${process.env.BACKEND_URL}/api/internal/end_users/${payment_method_id}/detach_stripe_payment_method`, {
          headers: { 
            'Session-Id': cookies._gybuilder_end_user_session
          }
        })
        router.push('/customer_page/payment_method')
      }
    })
  }

  return (
    <>
      <EndUserLoginLayout>
        <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={8}>
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
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default CardList
