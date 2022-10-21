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
import { nameChanged, priceChanged,
         issueNumberChanged,
         descriptionChanged,
         s3ObjectPublicUrlChanged } from 'redux/ticketMasterSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const name = useSelector((state: RootState) => state.ticketMaster.name)
  const issueNumber = useSelector((state: RootState) => state.ticketMaster.issueNumber)
  const price = useSelector((state: RootState) => state.ticketMaster.price)
  const description = useSelector((state: RootState) => state.ticketMaster.description)
  const publishStatus = useSelector((state: RootState) => state.ticketMaster.publishStatus)
  const base64Image = useSelector((state: RootState) => state.monthlyPaymentPlan.base64Image)
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)

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
        dispatch(s3ObjectPublicUrlChanged(ticketMasterResponse.s3_object_public_url))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchTicketMasters()
  }, [router.query.public_id, cookies._square_eight_merchant_session, dispatch])

  const createTicket = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/ticket_masters/${router.query.public_id}/update`,
    {
      ticket_master: {
        name: name,
        issue_number: issueNumber,
        price: price,
        description: description,
        publish_status: publishStatus,
        base64_image: base64Image
      }
    },
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
        {stripeAccountEnable === 'Enable' &&
        <>
          <CreateTicketTemplate showDeleteButton={true}></CreateTicketTemplate>
          <div className='text-center'>
            <Button onClick={createTicket}>登録する</Button>
          </div>
        </>}
        {stripeAccountEnable === 'Disable' && <GuideStripeAccountRegister></GuideStripeAccountRegister>}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Edit
