import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import { Container, Table, Button, FormControl, Row, Col } from 'react-bootstrap'

const MonthlyPayment: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <div className='text-center mt50 mb50'>
        <h3 className='mb15'>月額課金プラン作成</h3>
        <span></span>
        <br />
      </div>
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th className=' col-lg-4'>プラン名</th>
              <th className=' col-lg-2'>月額料金</th>
              <th className=' col-lg-5'>予約受付設定</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FormControl
                  placeholder='週2レッスンプラン 受講し放題プランなど'
                  aria-label='リソース名'
                />
              </td>
              <td>
                <FormControl
                  placeholder='10000'
                  aria-label='10000'
                />
              </td>
              <td>1ヶ月間予約し放題
                <a onClick={() => alert('aaa')}>（変更する）</a>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Row>
        <Col></Col>
        <Col>
          <Button variant='outline-primary' size='lg'>戻る</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant='primary' size='lg'>次へ</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant='outline-primary' size='lg'>スキップ</Button>
        </Col>
        <Col></Col>
      </Row>
    </>
  )
}

export default MonthlyPayment
