import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import React, { useEffect, useState } from 'react'
import { Container, Table, Pagination } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import Unauthorized from 'components/templates/Unauthorized'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [ticketMasters, setTicketMasters] = useState<TicketMasterParam[]>([])

  const allowReadTicketMaster = useSelector((state: RootState) => state.merchantUserPermission.allowReadTicketMaster)
  const allowUpdateTicketMaster = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateTicketMaster)

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
    const fetchTicketMasters = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/ticket_masters`, {
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
        const ticketMasterResponse: TicketMasterParam[] = response.data.ticket_masters
        setTicketMasters(ticketMasterResponse)
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchTicketMasters()
  }, [router.query.public_id, cookies._square_eight_merchant_session, router.query.website_id, currentPage, lastPage])

  return (
    <>
      <MerchantUserAdminLayout>
        {allowReadTicketMaster === 'Allow' && <Container>
          <a className='btn btn-primary mt10 mb20' href='/admin/ticket/new'>回数券登録</a>
          <h4>回数券一覧</h4>
          <Table bordered>
            <thead>
              <tr>
                <th>回数券名</th>
                <th>発行枚数</th>
                <th>値段</th>
                {allowUpdateTicketMaster === 'Allow' && <th>編集</th>}
                <th>購入ページ</th>
                <th>公開設定</th>
              </tr>
            </thead>
            <tbody>
              {ticketMasters.map((ticket, i) => {
                return(
                  <tr key={i}>
                    <td>{ticket.name}</td>
                    <td>{ticket.issue_number}枚</td>
                    <td>{ticket.price}</td>
                    {allowUpdateTicketMaster === 'Allow' && <td>
                      <a href={`/admin/ticket/${ticket.public_id}/edit`}
                        className='btn btn-primary btn-sm'>
                        編集
                      </a>
                    </td>}
                    <td>
                      <a href={`/ticket/${ticket.public_id}/purchase`}
                        className='btn btn-primary btn-sm'
                        target='_blank'
                        rel='noreferrer'>
                        購入ページプレビュー
                      </a>
                    </td>
                    <td>
                      <PublishStatusBadge publishStatus={ticket.publish_status} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
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
        </Container>}
        {allowReadTicketMaster === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
