import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import { WebpageParam } from 'interfaces/WebpageParam'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [webpages, setWebpages] = useState<WebpageParam[]>([])
  const allowReadWebpage = useSelector((state: RootState) => state.merchantUserPermission.allowReadWebpage)
  const allowUpdateWebpage = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateWebpage)

  useEffect(() => {
    const fetchWebpages = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/webpages`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        const websiteResponse: WebpageParam[] = response.data.webpages
        setWebpages(websiteResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchWebpages()
  }, [router.query.public_id, cookies._square_eight_merchant_session, router.query.website_id])

  return (
    <>
      <MerchantUserAdminLayout>
        {allowReadWebpage === 'Allow' && <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <h3>ページ一覧</h3>
              <ListGroup>
                {webpages.map((webpage, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col>
                          <span>{webpage.tag}</span>
                          <PublishStatusBadge publishStatus={webpage.publish_status}></PublishStatusBadge>
                        </Col>
                        <Col>
                          {allowUpdateWebpage === 'Allow' && <a className='btn btn-primary ml10' href={`/admin/webpage/${webpage.public_id}/edit`}>編集</a>}
                          <a className='btn btn-primary ml10' href={`/webpages/${webpage.public_id}`} target='_blank' rel='noreferrer'>プレビュー</a>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>}
        {allowReadWebpage === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
