import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Button, Row, Col, Pagination } from 'react-bootstrap'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { publicIdChanged,
         questionnaireMasterIdChanged,
         showCreateReserveFrameModalChanged,
         showEditReserveFrameModalChanged } from 'redux/reserveFrameSlice'
import CreateReserveFrameModal from 'components/organisms/CreateReserveFrameModal'
import EditReserveFrameModal from 'components/organisms/EditReserveFrameModal'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [reserveFrames, setReserveFrames] = useState<ReserveFrameParam[]>([])
  const allowReadReserveFrame = useSelector((state: RootState) => state.merchantUserPermission.allowReadReserveFrame)
  const allowCreateReserveFrame = useSelector((state: RootState) => state.merchantUserPermission.allowCreateReserveFrame)
  const allowUpdateReserveFrame = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateReserveFrame)
  // Pagination用
  // 表示するレコード数
  const displayCount = 3
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1000)
  let usePaginationNumberReturnVal = usePaginationNumber(currentPage, lastPage)
  let firstPaginationNum: number = usePaginationNumberReturnVal[0]
  let secondPaginationNum: number = usePaginationNumberReturnVal[1]
  let thirdPaginationNum: number = usePaginationNumberReturnVal[2]
  let forthPaginationNum: number = usePaginationNumberReturnVal[3]
  let fifthPaginationNum: number = usePaginationNumberReturnVal[4]

  useEffect(() => {
    const fetchReserveFrames = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames`, {
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
        const reserveFrameResponse: ReserveFrameParam[] = response.data.reserve_frames
        console.log(response.data)
        setReserveFrames(reserveFrameResponse)
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchReserveFrames()
  }, [router.query.public_id, cookies._square_eight_merchant_session, currentPage, lastPage])

  const repeatIntervalTypeText = (repeatIntervalType: string) => {
    switch (repeatIntervalType) {
      case 'Day':
        return (<div>日ごと</div>)
      case 'Week':
        return (<div>週ごと</div>)
      case 'Month':
        return (<div>月ごと</div>)
      case 'WDay':
        return (<div>曜日ごと</div>)
    }
  }

  return (
    <>
      <MerchantUserAdminLayout>
      <br />
        {allowReadReserveFrame === 'Allow' && <Container>
          {/* <ReservationLimitAlerts /> */}
          {allowCreateReserveFrame === 'Allow' && <Button
            className='mb30'
            onClick={() => {
              dispatch(questionnaireMasterIdChanged(''))
              dispatch(showCreateReserveFrameModalChanged(true))
            }}>新規登録</Button>}
            {reserveFrames.map((reserveFrame, i) => {
              return (
                <div key={i} className='mb30 border-solid padding-20'>
                  <Row>
                    <Col>
                      <h3>{reserveFrame.title}</h3>
                      <span><PublishStatusBadge publishStatus={reserveFrame.publish_status} /></span>
                      <hr />
                      <div>定員: {reserveFrame.capacity}</div>
                      <hr />
                      <Row>
                        <Col>
                          <div>開始日-終了日</div>
                          <div>{reserveFrame.display_start_at}{reserveFrame.display_end_at && <><br/>{reserveFrame.display_end_at}</>}<br/></div>
                        </Col>
                        <Col>
                          <div>受付時間</div>
                          <div>{reserveFrame.reserve_frame_reception_times_values.map((time, i) => {
                            return (
                              <div key={i + 10}>{time.reception_start_time}-{time.reception_end_time}</div>
                            )
                          })}</div>
                        </Col>
                      </Row>
                      <hr />
                      <div className='mb10'>繰り返し設定</div>
                      {!reserveFrame.is_repeat && <div>繰り返さない</div>}
                      {reserveFrame.is_repeat &&
                        <>
                          <div>{repeatIntervalTypeText(reserveFrame.repeat_interval_type)}</div>
                          <div>{reserveFrame.repeat_setting_text}</div>
                        </>
                      }
                      <hr />
                      <div>繰り返し範囲外予約受付日時</div>
                      <div>※終了日{reserveFrame.display_end_at && <>{'(' + reserveFrame.display_end_at + ')'}</>}以降の日時は反映されません</div>
                      {reserveFrame.out_of_range_frames_dates && reserveFrame.out_of_range_frames_dates.length
                        ?
                          <>
                            {reserveFrame.out_of_range_frames_dates.map((frame, i) => {
                              return (
                                <span key={i} className='mb10'>
                                  <div>{frame.start_at}</div>
                                </span>
                              )
                            })}
                          </>
                        :
                          <div className='mt20 mb10'>予約受付不可日時が設定されていません</div>
                        }
                      <hr />
                      <div>予約受付不可日時設定</div>
                      {reserveFrame.unreservable_frames_dates && reserveFrame.unreservable_frames_dates.length
                        ?
                          <>
                            {reserveFrame.unreservable_frames_dates.map((frame, i) => {
                              return (
                                <span key={i} className='mb10'>
                                  <div>{frame.start_at}</div>
                                </span>
                              )
                            })}
                          </>
                        :
                          <div className='mt20 mb10'>予約受付不可日時が設定されていません</div>
                        }
                    </Col>
                    <Col>
                      <div>
                        受付設定: {reserveFrame.reception_type_text}
                      </div>
                      <hr />
                      <div>受付開始: {reserveFrame.reception_start_day_before}日前から</div>
                      <hr />
                      <div>受付締め切り: {reserveFrame.reception_deadline_text}</div>
                      <hr />
                      <div>
                        キャンセル受付: {reserveFrame.cancel_reception_text}
                      </div>
                      <hr />
                      <div>お支払い方法</div>
                      <div>
                      {reserveFrame.payment_methods_text && reserveFrame.payment_methods_text.map((text, i) => {
                        return (
                          <span key={i}>{text}<br/></span>
                        )
                      })}</div>
                      <hr />
                      <div>店舗一覧</div>
                      <div>{reserveFrame.shops_name_with_public_id &&
                        reserveFrame.shops_name_with_public_id.map((r, i) => {
                          return (
                            <div key={i}>
                              <a href={`/admin/shop/${r.public_id}/edit`}
                                 target='_blank'
                                 rel='noreferrer'>{r.name}</a>
                            </div>
                          )
                        })}
                        {reserveFrame.shops_name_with_public_id.length === 0
                        && <div>店舗は設定されていません</div>}
                      </div>
                      <hr />
                      <div>リソース一覧</div>
                      <div>{reserveFrame.resources_name_with_public_id &&
                        reserveFrame.resources_name_with_public_id.map((r, i) => {
                          return (
                            <div key={i}>
                              <a href={`/admin/resource/${r.public_id}/edit`}
                                 target='_blank'
                                 rel='noreferrer'>{r.name}</a>
                            </div>
                          )
                        })}
                        {reserveFrame.resources_name_with_public_id.length === 0
                        && <div>リソースは設定されていません</div>}
                      </div>
                      <hr />
                      <div>アンケート設定</div>
                      {reserveFrame.questionnaire_master_title_with_public_id
                      &&
                      <a href={`/admin/questionnaire/master/${reserveFrame.questionnaire_master_title_with_public_id.public_id}/edit`}
                         target='_blank'
                         rel='noreferrer'>
                        {reserveFrame.questionnaire_master_title_with_public_id.title}
                      </a>}
                      {!reserveFrame.questionnaire_master_title_with_public_id && <div>アンケートは設定されていません</div>}
                      <hr />
                      <div>
                        {allowUpdateReserveFrame === 'Allow' && <a className='btn btn-primary'
                         onClick={() => {
                          dispatch(showEditReserveFrameModalChanged(true))
                          dispatch(publicIdChanged(reserveFrame.public_id))
                        }}>編集</a>}
                        <a className='btn btn-primary ml20'
                           target='_blank'
                           rel='noreferrer'
                           href={`/reserve_frame/${reserveFrame.public_id}/calendar`}>プレビュー</a>
                      </div>
                    </Col>
                  </Row>
                </div>
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
            {reserveFrames.length === 0 &&
              <div className='text-center font-size-20'>
                予約メニューが登録されていません。
              </div>}
          <CreateReserveFrameModal></CreateReserveFrameModal>
          <EditReserveFrameModal></EditReserveFrameModal>
        </Container>}
        {allowReadReserveFrame === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
