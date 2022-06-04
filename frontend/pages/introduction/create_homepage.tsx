import React from 'react'
import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import { useRouter } from 'next/router'
import { Button, Row, Col } from 'react-bootstrap'
import CreateHomepageTemplate from '../../components/templates/CreateHomepageTemplate'
import RegularFooter from '../../components/organisms/RegularFooter'
import axios from 'axios'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'

const CreateHomepage: NextPage = () => {
  const router = useRouter()
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)

  const completeCreateHomepage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/homepages/create_web_page`,
    {
      homepage: {
        page_content: pageContent
      }
    }).then(response => {
      // router.push('/admin/dashboard')
    }).catch(error => {
    })
  }

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
        <Col sm={4}>
          <Button variant='primary' size='lg' onClick={completeCreateHomepage}>ホームページ制作を完了する</Button>
        </Col>
        <Col></Col>
        <Col sm={2}>
          <Button variant='primary' size='lg' href='/introduction/set_reserve_calendar'>ページを追加</Button>
        </Col>
        <Col></Col>
        <Col sm={2}>
          <Button variant='outline-primary' size='lg' href='/introduction/set_reserve_calendar'>スキップ</Button>
        </Col>
        <Col></Col>
      </Row>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default CreateHomepage
