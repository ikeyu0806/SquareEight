import React from 'react'
import  { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import SalesLineChart from '../organisms/SalesLineChart'

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
              1月1日 12:00からhogeさんの予約が入っています
            </ListGroup.Item>
            <ListGroup.Item as="li">
              hogeさんが100回回数券 10000円を購入しました。
            </ListGroup.Item>
            <ListGroup.Item as="li">
              hogeさんが隔週予約プランを購入しました。
            </ListGroup.Item>
            <ListGroup.Item as="li">
              1月1日 12:00からhogeさんの予約が入っています
            </ListGroup.Item>
          </ListGroup>
          <div className='text-center mt10'>
            <Button>もっと見る</Button>
          </div>
        </Col>
        <Col>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              運営企業からのお知らせ
            </ListGroup.Item>
            <ListGroup.Item as="li">
              ホームページをプロに依頼
            </ListGroup.Item>
            <ListGroup.Item as="li">
              hoge機能をリリースしました
            </ListGroup.Item>
            <ListGroup.Item as="li">
              hoge機能をリリースしました
            </ListGroup.Item>
            <ListGroup.Item as="li">
              hoge機能をリリースしました
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
          <SalesLineChart></SalesLineChart>
        </Col>
        <Col>
          <SalesLineChart></SalesLineChart>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardTemplate

