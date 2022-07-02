import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/templates/IntroductionNavbar'
import EditBusinessHours from '../../components/organisms/EditBusinessHours'
import RegularFooter from '../../components/organisms/RegularFooter'
import { Row, Col, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

const BusinessHours: NextPage = () => {
  const router = useRouter()
  return (
    <>
      <IntroductionNavbar />
      <div className='text-center mt50 mb50'>
        <h2>営業時間を設定してください</h2>
      </div>
      <Row>
        <Col></Col>
        <Col xs={9}>
          <EditBusinessHours></EditBusinessHours>
        </Col>
        <Col></Col>
        <Col>
          <Button variant='outline-primary' size='lg' onClick={() => router.back()}>戻る</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant='primary' size='lg' href='/introduction/monthly_payment'>次へ</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant='outline-primary' size='lg' href='/introduction/monthly_payment'>スキップ</Button>
        </Col>
        <Col></Col>
      </Row>
      <br />
      <RegularFooter></RegularFooter>
    </>
  )
}

export default BusinessHours
