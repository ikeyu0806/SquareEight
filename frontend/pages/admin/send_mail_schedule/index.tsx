import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table, Button, Pagination } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { SendMailScheduleParam } from 'interfaces/SendMailScheduleParam'
import MessageBodyModal from 'components/templates/MessageBodyModal'
import { useDispatch } from 'react-redux'
import { usePaginationNumber } from 'hooks/usePaginationNumber'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import {  showMessageBodyModalChanged,
          selectedMessageBodyChanged,
          selectedMessageTypeChanged,
          selectedHtmlTemplateTypeChanged,
          selectedParsedMessageBodyChanged } from 'redux/sendMailHistorySlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [sendMailSchedules, setSendMailSchedules] = useState<SendMailScheduleParam[]>([])
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
    const fetchSendMailSchedules = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/send_mail_schedules`, {
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
        setSendMailSchedules(response.data.send_mail_schedules)
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchSendMailSchedules()
  }, [cookies._square_eight_merchant_session, currentPage, lastPage])

  const cancelSchedule = (publicId: string) => {
    swalWithBootstrapButtons.fire({
      title: '送信予約をキャンセルします',
      html: `キャンセルします。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: 'キャンセルする',
      cancelButtonText: 'キャンセルしない',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      axios.post(`${process.env.BACKEND_URL}/api/internal/send_mail_schedules/${publicId}/cancel`,
      {},
      {
        headers: {
          'Session-Id': cookies._square_eight_merchant_session
        }
      }).then(response => {
        swalWithBootstrapButtons.fire({
          title: 'キャンセルしました',
          icon: 'info'
        })
        location.reload()
      }).catch(error => {
        swalWithBootstrapButtons.fire({
          title: '失敗しました',
          icon: 'error'
        })
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      <br />
      <Container>
        <h4>メール送信予約一覧</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>メールタイトル</th>
              <th>対象メールアドレス</th>
              <th>顧客名</th>
              <th>本文</th>
              <th>送信予定日時</th>
              <th>ステータス</th>
            </tr>
          </thead>
          <tbody>
            {sendMailSchedules.map((schedule, i) => {
              return (
                <tr key={i} style={schedule.past_flg ? {backgroundColor: 'lightgray'} : {}}>
                  <td>{schedule.mail_title}</td>
                  <td>{schedule.email}</td>
                  <td>{schedule.customer_fullname}</td>
                  <td className='text-center'>
                    <Button onClick={() => {
                      dispatch(showMessageBodyModalChanged(true))
                      dispatch(selectedMessageBodyChanged(schedule.message_body))
                      dispatch(selectedMessageTypeChanged(schedule.message_template_type))
                      dispatch(selectedHtmlTemplateTypeChanged(schedule.html_template_type))
                      dispatch(selectedParsedMessageBodyChanged(schedule.parsed_message_body))
                    }}>表示する</Button>
                  </td>
                  <td>{schedule.display_scheduled_datetime}</td>
                  <td>
                    {schedule.send_status === 'Incomplete' &&
                    <div>
                      <div>未送信</div>
                      <Button
                        size='sm'
                        className='mt5'
                        onClick={() => cancelSchedule(schedule.public_id)}
                        variant='danger'>キャンセル</Button>
                    </div>}
                    {schedule.send_status === 'Cancel' && <>キャンセル済み</>}
                    {schedule.send_status === 'Complete' && <>送信済み</>}
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
      </Container>
      <MessageBodyModal></MessageBodyModal>
    </MerchantUserAdminLayout>
  )
}

export default Index
