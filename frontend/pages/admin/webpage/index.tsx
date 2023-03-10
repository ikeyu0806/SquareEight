import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Pagination } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import { WebpageParam } from 'interfaces/WebpageParam'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [webpages, setWebpages] = useState<WebpageParam[]>([])
  const allowReadWebpage = useSelector((state: RootState) => state.merchantUserPermission.allowReadWebpage)
  const allowUpdateWebpage = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateWebpage)
  // Pagination用
  // 表示するレコード数
  const displayCount = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1000)
  let usePaginationNumberReturnVal = usePaginationNumber(currentPage, lastPage)
  let firstPaginationNum: number = usePaginationNumberReturnVal[0]
  let secondPaginationNum: number = usePaginationNumberReturnVal[1]
  let thirdPaginationNum: number = usePaginationNumberReturnVal[2]
  let forthPaginationNum: number = usePaginationNumberReturnVal[3]
  let fifthPaginationNum: number = usePaginationNumberReturnVal[4]

  useEffect(() => {
    const fetchWebpages = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/webpages`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
          params: {
            current_page: currentPage,
            display_count: displayCount
          }
        }
      )
      .then(function (response) {
        const websiteResponse: WebpageParam[] = response.data.webpages
        setWebpages(websiteResponse)
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchWebpages()
  }, [router.query.public_id, cookies._square_eight_merchant_session, router.query.website_id, currentPage, lastPage])

  return (
    <>
      <MerchantUserAdminLayout>
      <br />
        {allowReadWebpage === 'Allow' &&
        <>
          <Container>
            <Row>
              <Col md={3}></Col>
              <Col md={6}>
                <a className='btn btn-primary mb20'
                  href='/admin/webpage/new'>
                  新規Webページ作成
                </a>
                {webpages.length > 0 && <><h3>Webページ一覧</h3>
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
                <br />
                <Pagination>
                  <Pagination.First onClick={() => setCurrentPage(1)} />
                  {currentPage > 1 && <Pagination.Prev
                    onClick={() => setCurrentPage(currentPage - 1)} />}
                  <Pagination.Item
                    active={currentPage == firstPaginationNum}
                    onClick={() => setCurrentPage(firstPaginationNum)}>{firstPaginationNum}</Pagination.Item>
                  {lastPage > 1 && <Pagination.Item
                    active={currentPage == secondPaginationNum}
                    onClick={() => setCurrentPage(secondPaginationNum)}>{secondPaginationNum}</Pagination.Item>}
                  {lastPage > 2 && <Pagination.Item
                    active={currentPage == thirdPaginationNum}
                    onClick={() => setCurrentPage(thirdPaginationNum)}>{thirdPaginationNum}</Pagination.Item>}
                  {lastPage > 3 && currentPage < lastPage &&  <Pagination.Item
                    active={currentPage == forthPaginationNum}
                    onClick={() => setCurrentPage(forthPaginationNum)}>{forthPaginationNum}</Pagination.Item>}
                  {lastPage > 4 && currentPage < lastPage - 1 && <Pagination.Item
                    active={currentPage == fifthPaginationNum}
                    onClick={() => setCurrentPage(fifthPaginationNum)}>{fifthPaginationNum}</Pagination.Item>}
                  {currentPage !== lastPage && <Pagination.Next
                    onClick={() => setCurrentPage(currentPage + 1)} />}
                  <Pagination.Last onClick={() => setCurrentPage(lastPage)} />
                </Pagination>
                </>}
              </Col>
            </Row>
            {webpages.length === 0 && <div className='text-center font-size-20'>Webページが登録されていません</div>}
          </Container>
        </>}
        {allowReadWebpage === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
