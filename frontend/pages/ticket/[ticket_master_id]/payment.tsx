import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card } from 'react-bootstrap'
import ProductPurchaseLayout from 'components/templates/ProductPurchaseLayout'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import { nameChanged,
         priceChanged,
         issueNumberChanged,
         descriptionChanged,
         s3ObjectPublicUrlChanged } from 'redux/ticketMasterSlice'

const Payment: NextPage = () => {
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const dispatch = useDispatch()
  const router = useRouter()
  const name = useSelector((state: RootState) => state.ticketMaster.name)
  const issueNumber = useSelector((state: RootState) => state.ticketMaster.issueNumber)
  const price = useSelector((state: RootState) => state.ticketMaster.price)
  const description = useSelector((state: RootState) => state.ticketMaster.description)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.ticketMaster.s3ObjectPublicUrl)


  useEffect(() => {
    const fetchTicketMaster = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/ticket_masters/${router.query.ticket_master_id}`, {
        }
      )
      .then(function (response) {
        const ticketMasterResponse: TicketMasterParam = response.data.ticket_master
        dispatch(nameChanged(ticketMasterResponse.name))
        dispatch(priceChanged(ticketMasterResponse.price))
        dispatch(issueNumberChanged(ticketMasterResponse.issue_number))
        dispatch(descriptionChanged(ticketMasterResponse.description))
        dispatch(s3ObjectPublicUrlChanged(ticketMasterResponse.s3_object_public_url))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchTicketMaster()
  }, [router.query.id, router.query.ticket_master_id, dispatch])

  return (
    <>
      <ProductPurchaseLayout>
        <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <Card>
                <Card.Header>回数券購入</Card.Header>
                <Card.Body>
                  {currentEndUserLogintStatus === 'Logout'
                    ? 
                      <>
                        <div></div>
                        <a href='/customer_page/login'>カスタマーアカウントでログインしてください</a><br/>
                        <div className='mt20'>購入にはアカウント登録とクレジットカード登録が必要になります</div>
                      </>
                    : <></>
                  }
                  <div className='mt40'></div>
                  <h3>{name}</h3>
                  <div>{issueNumber}枚</div>
                  <div>{price}円</div>
                  <div>{description}</div>
                  {s3ObjectPublicUrl
                  && <img
                      className='d-block w-100 mt30 mb30'
                      src={s3ObjectPublicUrl}
                      alt='image' />}
                  <h4>お支払い方法</h4>
                  <div>
                    <a className='btn btn-primary mt30' href={`/ticket/${router.query.ticket_master_id}/payment`}>購入に進む</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </ProductPurchaseLayout>
    </>
  )
}

export default Payment
