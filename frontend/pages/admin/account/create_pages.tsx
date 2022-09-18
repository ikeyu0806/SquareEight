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
        console.log(response.data)
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
              <h3>ページ一覧</h3>
              <ListGroup>
                {pageLinks.map((link, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col>
                          {link.text}&emsp;<span>【{link.label}】</span>
                        </Col>
                        <Col>
                          <a className='btn btn-primary btn-sm'
                            target='_blank'
                            rel='noreferrer'
                            href={link.value}>プレビュー</a>
                            <a className='btn btn-primary ml10 btn-sm'
                              onClick={() => copyLinkToClipboard(link.value)}>URLをコピー</a>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default CreatePages
