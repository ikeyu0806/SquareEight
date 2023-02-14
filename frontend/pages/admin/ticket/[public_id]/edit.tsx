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
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import Unauthorized from 'components/templates/Unauthorized'
import {  nameChanged,
          priceChanged,
          publishStatusChanged,
          issueNumberChanged,
          descriptionChanged,
          ticketMasterImage1ImagePublicUrlChanged,
          ticketMasterImage2ImagePublicUrlChanged,
          ticketMasterImage3ImagePublicUrlChanged,
          ticketMasterImage4ImagePublicUrlChanged,
          ticketMasterImage5ImagePublicUrlChanged,
          selectedShopIdsChanged,
          selectableReserveFramesChanged,
          selectedReserveFrameIdsChanged } from 'redux/ticketMasterSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const name = useSelector((state: RootState) => state.ticketMaster.name)
  const issueNumber = useSelector((state: RootState) => state.ticketMaster.issueNumber)
  const price = useSelector((state: RootState) => state.ticketMaster.price)
  const description = useSelector((state: RootState) => state.ticketMaster.description)
  const publishStatus = useSelector((state: RootState) => state.ticketMaster.publishStatus)
  const effectiveMonth = useSelector((state: RootState) => state.ticketMaster.effectiveMonth)
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)
  const allowUpdateTicketMaster = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateTicketMaster)
  const shops = useSelector((state: RootState) => state.account.shops)
  const ticketMasterImage1File = useSelector((state: RootState) => state.ticketMaster.ticketMasterImage1File)
  const ticketMasterImage2File = useSelector((state: RootState) => state.ticketMaster.ticketMasterImage2File)
  const ticketMasterImage3File = useSelector((state: RootState) => state.ticketMaster.ticketMasterImage3File)
  const ticketMasterImage4File = useSelector((state: RootState) => state.ticketMaster.ticketMasterImage4File)
  const ticketMasterImage5File = useSelector((state: RootState) => state.ticketMaster.ticketMasterImage5File)
  const selectedReserveFrameIds = useSelector((state: RootState) => state.ticketMaster.selectedReserveFrameIds)

  useEffect(() => {
    const fetchTicketMasters = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/ticket_masters/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        const ticketMasterResponse: TicketMasterParam = response.data.ticket_master
        dispatch(nameChanged(ticketMasterResponse.name))
        dispatch(priceChanged(ticketMasterResponse.price))
        dispatch(issueNumberChanged(ticketMasterResponse.issue_number))
        dispatch(descriptionChanged(ticketMasterResponse.description))
        dispatch(publishStatusChanged(response.data.ticket_master.publish_status))
        dispatch(selectedShopIdsChanged(response.data.ticket_master.selected_shop_ids))
        dispatch(ticketMasterImage1ImagePublicUrlChanged(response.data.ticket_master.image1_account_s3_image_public_url))
        dispatch(ticketMasterImage2ImagePublicUrlChanged(response.data.ticket_master.image2_account_s3_image_public_url))
        dispatch(ticketMasterImage3ImagePublicUrlChanged(response.data.ticket_master.image3_account_s3_image_public_url))
        dispatch(ticketMasterImage4ImagePublicUrlChanged(response.data.ticket_master.image4_account_s3_image_public_url))
        dispatch(ticketMasterImage5ImagePublicUrlChanged(response.data.ticket_master.image5_account_s3_image_public_url))
        dispatch(selectableReserveFramesChanged(response.data.selectable_reserve_frames))
        dispatch(selectedReserveFrameIdsChanged(response.data.resource.selected_reserve_frame_ids))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchTicketMasters()
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
    axios.post(`${process.env.BACKEND_URL}/api/internal/ticket_masters/${router.query.public_id}/update`,
    params,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '更新しました', show: true}))
      router.push('/admin/ticket')
    }).catch(error => {
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        {stripeAccountEnable === 'Enable' && allowUpdateTicketMaster === 'Allow' &&
        <>
          <CreateTicketTemplate showDeleteButton={true}></CreateTicketTemplate>
          <div className='text-center'>
            <Button onClick={createTicket}>登録する</Button>
          </div>
        </>}
        {allowUpdateTicketMaster === 'Forbid' && <Unauthorized />}
        {stripeAccountEnable === 'Disable' && <GuideStripeAccountRegister></GuideStripeAccountRegister>}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Edit
