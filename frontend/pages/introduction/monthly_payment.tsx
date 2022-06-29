import React, { useState } from 'react'
import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/templates/IntroductionNavbar'
import RegularFooter from '../../components/organisms/RegularFooter'
import { Container, Table, Button, FormControl, Row, Col, Modal, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import CreateMonthlyPayment from 'components/templates/CreateMonthlyPayment'

const MonthlyPayment: NextPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [isReserveLimited, setIsReserveLimited] = useState(true)
  const router = useRouter()
  return (
    <>
      <IntroductionNavbar />
      <Container>
        <CreateMonthlyPayment></CreateMonthlyPayment>
      </Container>
      <Row>
        <Col></Col>
        <Col>
          <Button variant='outline-primary' size='lg' onClick={() => router.back()}>戻る</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant='primary' size='lg' href='/introduction/ticket'>次へ</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant='outline-primary' size='lg' href='/introduction/ticket'>スキップ</Button>
        </Col>
        <Col></Col>
      </Row>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default MonthlyPayment
