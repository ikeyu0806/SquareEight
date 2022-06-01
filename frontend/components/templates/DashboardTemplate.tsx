import React from 'react'
import  { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import ReservePageSalesLineChart from '../organisms/ReservePageSalesLineChart'
import MonthlyPaymentTicketLineChart from '../organisms/MonthlyPaymentTicketLineChart'

const DashboardTemplate = (): JSX.Element => {
  return (
    <Container>
      <Row>
        <Col>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              通知一覧
            </ListGroup.Item>
            <ListGroup.Item as="li">
              8月2日 12:00から筋トレメソッドに3名の予約が入っています
            </ListGroup.Item>
            <ListGroup.Item as="li">
              池谷さんが100回回数券 10000円を購入しました。
            </ListGroup.Item>
            <ListGroup.Item as="li">
              池谷さんが隔週受講プランに加入しました。 
            </ListGroup.Item>
            <ListGroup.Item as="li">
              8月1日 12:00からボディメイクに3名の予約が入っています
            </ListGroup.Item>
          </ListGroup>
          <div className='text-center mt10'>
            <Button>もっと見る</Button>
          </div>
        </Col>
        <Col>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              運営からのお知らせ
            </ListGroup.Item>
            <ListGroup.Item as="li">
              ホームページ作成をプロに依頼しませんか？
            </ListGroup.Item>
            <ListGroup.Item as="li">
              ホームページへの住所追加機能をリリースしました
            </ListGroup.Item>
            <ListGroup.Item as="li">
              回数券機能をリリースしました
            </ListGroup.Item>
            <ListGroup.Item as="li">
              顧客メモ機能をリリースしました
            </ListGroup.Item>
            <div className='text-center mt10'>
              <Button>もっと見る</Button>
            </div>
          </ListGroup>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <ReservePageSalesLineChart></ReservePageSalesLineChart>
        </Col>
        <Col>
          <MonthlyPaymentTicketLineChart></MonthlyPaymentTicketLineChart>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardTemplate

