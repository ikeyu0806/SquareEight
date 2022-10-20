import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Table, Button } from 'react-bootstrap'
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
  }, [router.query.id, cookies._square_eight_merchant_session])

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <ReservationLimitAlerts />
          <Button
            className='mb30'
            onClick={() => dispatch(showCreateReserveFrameModalChanged(true))}>新規登録</Button>
          <Table bordered>
            <thead>
              <tr>
                <th className='text-center'>予約メニュー名</th>
                <th className='text-center'>定員</th>
                <th className='text-center'>開始日-終了日/繰り返し設定</th>
                <th className='text-center'>お支払い方法</th>
                <th className='text-center'>公開設定/受付設定</th>
                <th className='text-center'></th>
                <th className='text-center'></th>
              </tr>
            </thead>
            <tbody>
              {reserveFrames.map((reserveFrame, i) => {
                return (
                  <tr key={i}>
                    <td className='text-center'>
                      {reserveFrame.title}
                    </td>
                    <td className='text-center'>
                      {reserveFrame.capacity}
                    </td>
                    <td className='text-center'>
                      {reserveFrame.display_start_at}{reserveFrame.display_end_at && <><br/>{reserveFrame.display_end_at}</>}<br/>
                      {reserveFrame.repeat_setting_text}
                    </td>
                    <td className='text-center'>
                      {reserveFrame.payment_methods_text && reserveFrame.payment_methods_text.map((text, i) => {
                        return (
                          <span key={i}>{text}<br/></span>
                        )
                      })}
                    </td>
                    <td className='text-center'>
                      {reserveFrame.publish_status === 'Publish' ? '公開' : '非公開'}<br/>
                      {reserveFrame.reception_type_text}
                    </td>
                    <td>
                      <a className='btn btn-primary'
                         onClick={() => {
                          dispatch(showEditReserveFrameModalChanged(true))
                          dispatch(publicIdChanged(reserveFrame.public_id))
                        }}>編集</a>
                    </td>
                    <td>
                    <a className='btn btn-primary ml10'
                       target='_blank'
                       rel='noreferrer'
                       href={`/reserve_frame/${reserveFrame.public_id}/calendar`}>プレビュー</a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <CreateReserveFrameModal></CreateReserveFrameModal>
          <EditReserveFrameModal></EditReserveFrameModal>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
