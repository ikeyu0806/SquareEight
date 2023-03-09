import React, { useEffect, useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { QuestionnaireMasterParam } from 'interfaces/QuestionnaireMasterParam'
import { useCookies } from 'react-cookie'
import { Container, Pagination, Table } from 'react-bootstrap'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [questionnaireMasters, setQuestionnaireMasters] = useState<QuestionnaireMasterParam[]>()
  const allowReadQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowReadQuestionnaireMaster)
  const allowCreateQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowCreateQuestionnaireMaster)
  const allowUpdateQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateQuestionnaireMaster)
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
    axios.get(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      },
      params: {
        current_page: currentPage,
        display_count: displayCount
      }
    }).then((response) => {
      setQuestionnaireMasters(response.data.questionnaire_masters)
      setLastPage(response.data.last_page)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, currentPage, lastPage])

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowReadQuestionnaireMaster === 'Allow' &&
      questionnaireMasters && questionnaireMasters.length > 0 &&
      <Container>
        {allowCreateQuestionnaireMaster &&
        <a className='btn btn-primary' href='/admin/questionnaire/master/new'>新規登録</a>}
        <h4 className='mt20 mb20'>アンケートマスタ</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>アンケートマスタ名</th>
              <th>公開ステータス</th>
              <th>プレビュー</th>
              <th>編集</th>
              <th>回答一覧</th>
            </tr>
          </thead>
          <tbody>
          {questionnaireMasters && questionnaireMasters.map((questionare, i) => {
          return (
            <tr key={i}>
              <td>{questionare.title}</td>
              <td>
                <PublishStatusBadge publishStatus={questionare.publish_status} />
              </td>
              <td className='text-center'>
                <a className='btn btn-primary'
                   target='_blank'
                   rel='noreferrer'
                   href={`/questionnaire/${questionare.public_id}`}>プレビュー</a>
              </td>
              <td className='text-center'>
                {allowUpdateQuestionnaireMaster === 'Allow' &&
                  <a className='btn btn-primary ml30'
                     href={`/admin/questionnaire/master/${questionare.public_id}/edit`}>編集</a>}
              </td>
              <td className='text-center'>
                <a  className='btn btn-primary ml30'
                    href={`/admin/questionnaire/master/${questionare.public_id}/answer`}>回答一覧</a>
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
      {questionnaireMasters && questionnaireMasters.length === 0 &&
        <Container>
          {allowCreateQuestionnaireMaster &&
            <a className='btn btn-primary' href='/admin/questionnaire/master/new'>新規登録</a>}
          <div className='text-center font-size-20'>アンケートマスタが登録されていません。</div>
        </Container>
      }
      {allowReadQuestionnaireMaster === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Index
