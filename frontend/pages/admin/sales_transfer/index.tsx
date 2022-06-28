import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Card } from 'react-bootstrap'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()

  useEffect(() => {
    const fetchWebpage = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/accounts/stripe_connected_account`, {
          headers: { 
            'Session-Id': cookies._smartlesson_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchWebpage()
  }, [router.query.id, cookies._smartlesson_session, router.query.webpage_id, dispatch])

  return (
    <>
      <AdminNavbar></AdminNavbar>
        <Container>
          <Row>
            <Col>
              <Card className='mt20'>
                <Card.Header>事業情報</Card.Header>
                <Card.Body>
                  <Card.Title>事業形態</Card.Title>
                  <Card.Text>個人事業主</Card.Text>
                  <Card.Title>事業主様の姓（漢字）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>事業主様の姓（カナ）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>事業主様のお名前（漢字）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>事業主様のお名前（カナ）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>事業責任者の生年月日</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>事業責任者の姓別</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>事業責任者の電話番号</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>事業責任者のメールアドレス</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>事業のウェブサイト</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>商品、サービス内容の詳細</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>郵便番号</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>都道府県（漢字）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>都道府県（カナ）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>区市町村（漢字）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>区市町村（カナ）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>町名（丁目まで、漢字）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>町名（丁目まで、カナ）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>番地、号（漢字）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>番地、号（カナ）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>建物・部屋番号・その他 （漢字）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <Card.Title>建物・部屋番号・その他 （カナ）</Card.Title>
                  <Card.Text>イケガヤ</Card.Text>
                  <a href='/admin/sales_transfer/register_business_info' className='btn btn-primary'>事業情報登録</a>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className='mt20'>
                <Card.Header>振込先口座情報</Card.Header>
                <Card.Body>           
                  <br/>
                  <br/>
                  <a href='/admin/sales_transfer/register_bank_account' className='btn btn-primary'>振込先口座登録</a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Index
