import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, ListGroup, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
import { PageLinksParam } from 'interfaces/PageLinksParam'
import { useCookies } from 'react-cookie'

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
                    {link.text}&emsp;<span>【{link.label}】</span>
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
