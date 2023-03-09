import React, { useEffect, useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { QuestionnaireAnswerParam } from 'interfaces/QuestionnaireAnswerParam'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { Container, Pagination, Card } from 'react-bootstrap'
import Unauthorized from 'components/templates/Unauthorized'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Answer = (): JSX.Element => {
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswerParam[]>()
  const allowReadQuestionnaireAnswer = useSelector((state: RootState) => state.merchantUserPermission.allowReadQuestionnaireAnswer)
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
    axios.get(`${process.env.BACKEND_URL}/api/internal/accounts/questionnaire_answers`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      },
      params: {
        current_page: currentPage,
        display_count: displayCount
      }
    }).then((response) => {
      setQuestionnaireAnswers(response.data.answer_contents)
      setLastPage(response.data.last_page)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, router, currentPage, lastPage])

  useEffect(() => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant/read_notification_status/read_questionnaire_answers`,
    {},
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      },
      params: {
        current_page: currentPage,
        display_count: displayCount
      }
    })
  }, [cookies._square_eight_merchant_session, currentPage, lastPage])

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowReadQuestionnaireAnswer === 'Allow' && <Container>
        <h3 className='mb20'>回答一覧</h3>
        {questionnaireAnswers && questionnaireAnswers.map((answer, i) => {
          return (
            <Card key={i} className='mb20'>
              <Card.Body>
                <div>回答者: {answer.customer_name}</div>
                <div>回答日時: {answer.answer_datetime}</div>
                <div className='mt30 mb10'>回答一覧</div>
                {answer.answer && answer.answer.map((a, i) => {
                  return (
                    <div key={i}>
                      <div>{a.question}: {a.answer}</div>
                    </div>

                  )
                })}
              </Card.Body>
            </Card>
          )
        })}
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
        {questionnaireAnswers && questionnaireAnswers.length === 0 &&
        <div className='text-center font-size-20'>回答がありません</div>}
      </Container>}
      {allowReadQuestionnaireAnswer === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Answer
