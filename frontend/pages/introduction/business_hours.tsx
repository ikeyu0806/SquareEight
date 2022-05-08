import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import { Container, Table, Row, Col, Form, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

const BusinessHours: NextPage = () => {
  const router = useRouter()
  return (
    <>
      <IntroductionNavbar />
      <div className='text-center mt50 mb50'>
        <h2>営業時間を設定してください</h2>
      </div>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={9}>
            <Table bordered>
              <thead>
                <tr className='primary'>
                  <th className='text-center col-lg-2 col-xs-2'>曜日</th>
                  <th className='text-center col-lg-1 col-xs-1'></th>
                  <th className='text-center col-lg-3 col-xs-3'>開始時間</th>
                  <th className='text-center col-lg-3 col-xs-3'>終了時間</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={2} className='text-center'>日曜日</td>
                  <td className='text-center'>営業時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td className='text-center'>休憩時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td rowSpan={2} className='text-center'>月曜日</td>
                  <td className='text-center'>営業時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td className='text-center'>休憩時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td rowSpan={2} className='text-center'>火曜日</td>
                  <td className='text-center'>営業時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td className='text-center'>休憩時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td rowSpan={2} className='text-center'>水曜日</td>
                  <td className='text-center'>営業時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td className='text-center'>休憩時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td rowSpan={2} className='text-center'>木曜日</td>
                  <td className='text-center'>営業時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td className='text-center'>休憩時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td rowSpan={2} className='text-center'>金曜日</td>
                  <td className='text-center'>営業時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td className='text-center'>休憩時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td rowSpan={2} className='text-center'>土曜日</td>
                  <td className='text-center'>営業時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
                <tr>
                  <td className='text-center'>休憩時間</td>
                  <td><Form.Control type='time' /></td>
                  <td><Form.Control type='time' /></td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Row>
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
    </>
  )
}

export default BusinessHours
