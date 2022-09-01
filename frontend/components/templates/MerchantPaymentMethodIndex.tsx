import React, { useEffect, useState } from 'react'
import { Container, Card, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { StripePaymentMethodsParam } from 'interfaces/StripePaymentMethodsParam'

const MerchantPaymentMethodIndex = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [paymentMethods, setPaymentMethods] = useState<StripePaymentMethodsParam[]>()
  const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState('')

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
  }, [cookies._square_eight_merchant_session])

  return (
    <>
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
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
              }
          </Card.Text>
            <a className='btn btn-primary ml10'
                    href='/admin/payment_method/register'>
              新規カード登録
            </a>
            <a className='btn btn-primary ml10'
                    href='/admin/payment_method/card_list'>
              お支払いカードの変更・登録削除
            </a>
        </Card.Body>
      </Card>
    </>
  )
}

export default MerchantPaymentMethodIndex
