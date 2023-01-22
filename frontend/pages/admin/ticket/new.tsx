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
import { publishStatusChanged } from 'redux/ticketMasterSlice'
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
  const base64Image = useSelector((state: RootState) => state.ticketMaster.base64Image)
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)
  const allowCreateTicketMaster = useSelector((state: RootState) => state.merchantUserPermission.allowCreateTicketMaster)
  const shops = useSelector((state: RootState) => state.account.shops)

  useEffect(() => {
    dispatch(publishStatusChanged('Unpublish'))
  }, [dispatch])

  const createTicket = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/ticket_masters`,
    {
      ticket_master: {
        name: name,
        issue_number: issueNumber,
        price: price,
        effective_month: effectiveMonth,
        description: description,
        publish_status: publishStatus,
        base64_image: base64Image,
        shops: shops
      }
    },
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
