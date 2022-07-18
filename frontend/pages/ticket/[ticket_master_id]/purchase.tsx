import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import PurchaseTicketTemplate from 'components/templates/PurchaseTicketTemplate'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import { nameChanged,
         priceChanged,
         issueNumberChanged,
         descriptionChanged,
         s3ObjectPublicUrlChanged } from 'redux/ticketMasterSlice'

const Purchase: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()

  useEffect(() => {
    const fetchTicketMasters = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/ticket_masters/${router.query.ticket_master_id}`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
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
  }, [router.query.id, cookies._gybuilder_merchant_session, router.query.ticket_master_id, dispatch])

  return (
    <>
      <WithoutSessionLayout>
        <PurchaseTicketTemplate></PurchaseTicketTemplate>
      </WithoutSessionLayout>
    </>
  )
}

export default Purchase
