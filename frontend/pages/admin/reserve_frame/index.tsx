import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Button, ListGroup, Row, Col } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { publicIdChanged,
         showCreateReserveFrameModalChanged,
         showEditReserveFrameModalChanged } from 'redux/reserveFrameSlice'
import CreateReserveFrameModal from 'components/organisms/CreateReserveFrameModal'
import EditReserveFrameModal from 'components/organisms/EditReserveFrameModal'
import ReservationLimitAlerts from 'components/molecules/ReservationLimitAlerts'

const Index = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [reserveFrames, setReserveFrames] = useState<ReserveFrameParam[]>([])

  useEffect(() => {
    const fetchReserveFrames = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames`, {
          headers: {
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        const reserveFrameResponse: ReserveFrameParam[] = response.data.reserve_frames
        console.log(response.data)
        setReserveFrames(reserveFrameResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchReserveFrames()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <ReservationLimitAlerts />
          <Button
            className='mb30'
            onClick={() => dispatch(showCreateReserveFrameModalChanged(true))}>新規登録</Button>
            {reserveFrames.map((reserveFrame, i) => {
              return (
                <div key={i} className='mb30 border-solid padding-20'>
                  <Row>
                    <Col>
                      <h3>{reserveFrame.title}</h3>
                      <span>{reserveFrame.publish_status === 'Publish' ? '公開' : '非公開'}</span>
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
                      <div>繰り返し設定</div>
                      {!reserveFrame.is_repeat && <div>繰り返さない</div>}
                      <hr />
                      <div>お支払い方法</div>
                      <div>
                      {reserveFrame.payment_methods_text && reserveFrame.payment_methods_text.map((text, i) => {
                        return (
                          <span key={i}>{text}<br/></span>
                        )
                      })}</div>
                    </Col>
                    <Col>
                      <div>
                        {reserveFrame.reception_type_text}
                      </div>
                      <hr />
                      <div>リソース一覧</div>
                      <hr />
                      <div>アンケート設定</div>
                      <hr />
                      <div>
                        <a className='btn btn-primary'
                         onClick={() => {
                          dispatch(showEditReserveFrameModalChanged(true))
                          dispatch(publicIdChanged(reserveFrame.public_id))
                        }}>編集</a>
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
          <CreateReserveFrameModal></CreateReserveFrameModal>
          <EditReserveFrameModal></EditReserveFrameModal>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
