import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Pagination, Table } from 'react-bootstrap'
import axios from 'axios'
import { ResourceParam } from 'interfaces/ResourceParam'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import Unauthorized from 'components/templates/Unauthorized'
import CreateResourceLimitAlert from 'components/atoms/CreateResourceLimitAlert'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [resources, setResources] = useState<ResourceParam[]>([])
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)
  const allowReadResource = useSelector((state: RootState) => state.merchantUserPermission.allowReadResource)
  const allowCreateResource = useSelector((state: RootState) => state.merchantUserPermission.allowCreateResource)
  const allowUpdateResource = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateResource)
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
    const fetchResources = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/resources`, {
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
        console.log(response.data)
        setResources(response.data.resources)
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchResources()
  }, [router.query.public_id, cookies._square_eight_merchant_session, currentPage, lastPage])

  return (
    <>
      <MerchantUserAdminLayout>
        <CreateResourceLimitAlert />
        <br />
        {allowReadResource === 'Allow' &&
        <Container>
          <h4>リソース一覧</h4>
          {resources.length > 0 && <Table bordered>
            <thead>
              <tr>
                <th>リソース名</th>
                <th>同時予約受付数</th>
                <th>リソース種別</th>
                <th>編集</th>
              </tr>
            </thead>
            <tbody>
            {resources.map((r, i) => {
                return (
                  <tr key={i}>
                    <td>{r.name}</td>
                    <td>{r.quantity}</td>
                    <td>{r.resource_type_text}</td>
                    <td className='text-center'>
                      {allowUpdateResource === 'Allow' && <td>
                        <a className='btn btn-primary'
                          href={`/admin/resource/${r.public_id}/edit`}>編集</a>
                      </td>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>}
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
          {resources.length === 0 &&
          <div className='text-center font-size-20'>リソースが登録されていません</div>}
        </Container>}
        {allowCreateResource === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
