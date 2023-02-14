import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import CreateTicketTemplate from 'components/templates/CreateTicketTemplate'
import GuideStripeAccountRegister from 'components/templates/GuideStripeAccountRegister'
import { Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'
import { publishStatusChanged, selectableReserveFramesChanged } from 'redux/ticketMasterSlice'
import Unauthorized from 'components/templates/Unauthorized'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const name = useSelector((state: RootState) => state.ticketMaster.name)
  const issueNumber = useSelector((state: RootState) => state.ticketMaster.issueNumber)
  const price = useSelector((state: RootState) => state.ticketMaster.price)
  const effectiveMonth = useSelector((state: RootState) => state.ticketMaster.effectiveMonth)
  const description = useSelector((state: RootState) => state.ticketMaster.description)
  const publishStatus = useSelector((state: RootState) => state.ticketMaster.publishStatus)
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)
  const allowCreateTicketMaster = useSelector((state: RootState) => state.merchantUserPermission.allowCreateTicketMaster)
  const shops = useSelector((state: RootState) => state.account.shops)
  const ticketMasterImage1File = useSelector((state: RootState) => state.ticketMaster.ticketMasterImage1File)
  const ticketMasterImage2File = useSelector((state: RootState) => state.ticketMaster.ticketMasterImage2File)
  const ticketMasterImage3File = useSelector((state: RootState) => state.ticketMaster.ticketMasterImage3File)
  const ticketMasterImage4File = useSelector((state: RootState) => state.ticketMaster.ticketMasterImage4File)
  const ticketMasterImage5File = useSelector((state: RootState) => state.ticketMaster.ticketMasterImage5File)
  const selectedReserveFrameIds = useSelector((state: RootState) => state.ticketMaster.selectedReserveFrameIds)

  useEffect(() => {
    dispatch(publishStatusChanged('Unpublish'))
    const fetchRelatedData = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/ticket_masters/related_data`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        dispatch(selectableReserveFramesChanged(response.data.selectable_reserve_frames))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchRelatedData()
  }, [router.query.public_id, cookies._square_eight_merchant_session, dispatch])

  const createTicket = () => {
    const params = new FormData()
    let ticketMasterParam = JSON.stringify(
      {
        ticket_master: {
          name: name,
          issue_number: issueNumber,
          price: price,
          effective_month: effectiveMonth,
          description: description,
          publish_status: publishStatus,
          shops: shops
        }
      }
    )

    params.append('ticket_master', ticketMasterParam)
    params.append('ticket_master_image1_file', ticketMasterImage1File as Blob)
    params.append('ticket_master_image2_file', ticketMasterImage2File as Blob)
    params.append('ticket_master_image3_file', ticketMasterImage3File as Blob)
    params.append('ticket_master_image4_file', ticketMasterImage4File as Blob)
    params.append('ticket_master_image5_file', ticketMasterImage5File as Blob)
    selectedReserveFrameIds.forEach((id, i) => {
      params.append('reserve_frame_ids' + '[]', String(id))
    })
    axios.post(`${process.env.BACKEND_URL}/api/internal/ticket_masters`,
    params,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '登録しました', show: true}))
      router.push('/admin/ticket')
    }).catch(error => {
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        {stripeAccountEnable === 'Enable' && allowCreateTicketMaster === 'Allow' &&
        <>
          {allowCreateTicketMaster === 'Allow' && <CreateTicketTemplate></CreateTicketTemplate>}
          <div className='text-center'>
            <Button onClick={createTicket}>登録する</Button>
          </div>
        </>}
        {stripeAccountEnable === 'Disable' && <GuideStripeAccountRegister></GuideStripeAccountRegister>}
        {allowCreateTicketMaster === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default New
