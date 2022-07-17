import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Table, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from "components/templates/MerchantUserAdminLayout"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'

const Index = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const [reserveFrames, setReserveFrames] = useState<ReserveFrameParam[]>([])

  useEffect(() => {
    const fetchReserveFrames = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
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
    console.log("!!", reserveFrames)
  }, [router.query.id, cookies._gybuilder_merchant_session])

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <Table bordered>
            <thead>
              <tr>
                <th className='text-center'>予約メニュー名</th>
                <th className='text-center'>開始日時/終了日時</th>
                <th className='text-center'>定員</th>
                <th className='text-center'>繰り返し設定</th>
                <th className='text-center'>お支払い方法</th>
                <th className='text-center'>公開設定</th>
                <th className='text-center'>受付設定</th>
                <th></th>
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
                      {reserveFrame.display_start_at}{reserveFrame.display_end_at && <><br/>{reserveFrame.display_end_at}</>}
                    </td>
                    <td className='text-center'>
                      {reserveFrame.capacity}
                    </td>
                    <td className='text-center'>
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
                      {reserveFrame.publish_status === 'Published' ? '公開' : '非公開'}
                    </td>
                    <td className='text-center'>
                    </td>
                    <td>
                      <a className='btn btn-primary'>編集</a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
