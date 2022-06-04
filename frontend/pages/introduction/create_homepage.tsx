import React, { useState } from 'react'
import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import { useRouter } from 'next/router'
import { Button, Container, Card, Row, Col, Carousel, Navbar, Modal } from 'react-bootstrap'
import CreateHomepageTemplate from '../../components/templates/CreateHomepageTemplate'
import RegularFooter from '../../components/organisms/RegularFooter'

const CreateHomepage: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <IntroductionNavbar />
      <div className='text-center mt50 mb50'>
        <h2>ホームページを作成します</h2>
      </div>
      <CreateHomepageTemplate></CreateHomepageTemplate>
      <br />
      <Row>
        <Col></Col>
        <Col></Col>
        <Col sm={2}>
          <Button variant='outline-primary' size='lg' onClick={() => router.back()}>戻る</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col sm={2}>
          <Button variant='primary' size='lg' href='/introduction/set_reserve_calendar'>保存して次へ</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col sm={2}>
          <Button variant='outline-primary' size='lg' href='/introduction/set_reserve_calendar'>スキップ</Button>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default CreateHomepage
