import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, ListGroup, Row, Col, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import { PageLinksParam } from 'interfaces/PageLinksParam'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const CreatePages: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [pageLinks, setPageLinks] = useState<PageLinksParam[]>([])

  useEffect(() => {
    const fetchPageLinks = () => {
      axios.get(`${process.env.BACKEND_URL}/api/internal/accounts/page_links`,
      {
        headers: {
          'Session-Id': cookies._square_eight_merchant_session
        }
      }).then((response) => {
        setPageLinks(response.data.page_links)
      }).catch((e) => {
        console.log(e)
      })
    }
    fetchPageLinks()
  }, [cookies._square_eight_merchant_session])

  const copyLinkToClipboard = (url: string) => {
    navigator.clipboard.writeText(`${process.env.FRONTEND_URL}${url}`)
    .then(() => {
      swalWithBootstrapButtons.fire({
        title: 'コピーしました',
        icon: 'info'
      })
    },(err) => {
      swalWithBootstrapButtons.fire({
        title: 'コピー失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Card>
              <Card.Header>ページ一覧</Card.Header>
              {pageLinks.map((link, i) => {
                return (
                  <ListGroup.Item key={i}>
                    <Row>
                      <Col>
                        {link.text}&emsp;<span>【{link.label}】</span>
                      </Col>
                      <Col>
                        <a className='btn btn-primary'
                           target='_blank'
                           rel='noreferrer'
                           href={link.value}>プレビュー</a>
                          <br/>
                          <a className='btn btn-primary mt10'
                             onClick={() => copyLinkToClipboard(link.value)}>クリップボードにコピー</a>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              })}
            </Card>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default CreatePages
