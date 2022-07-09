import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import AdminNavbar from '../../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../../components/organisms/RegularFooter'
import CreateTicketTemplate from 'components/templates/CreateTicketTemplate'
import { Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import { nameChanged, priceChanged, issueNumberChanged } from 'redux/ticketMasterSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_session'])
  const router = useRouter()
  const name = useSelector((state: RootState) => state.ticketMaster.name)
  const issueNumber = useSelector((state: RootState) => state.ticketMaster.issueNumber)
  const price = useSelector((state: RootState) => state.ticketMaster.price)

  useEffect(() => {
    const fetchTicketMasters = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/ticket_masters/${router.query.ticket_master_id}/edit`, {
          headers: { 
            'Session-Id': cookies._gybuilder_session
          },
        }
      )
      .then(function (response) {
        const ticketMasterResponse: TicketMasterParam = response.data.ticket_master
        dispatch(nameChanged(ticketMasterResponse.name))
        dispatch(priceChanged(ticketMasterResponse.price))
        dispatch(issueNumberChanged(ticketMasterResponse.issue_number))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchTicketMasters()
  }, [router.query.id, cookies._gybuilder_session, router.query.ticket_master_id, dispatch])

  const createTicket = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/ticket_masters/${router.query.ticket_master_id}/update`,
    {
      ticket_master: {
        name: name,
        issue_number: issueNumber,
        price: price
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '更新しました', show: true}))
      router.push('/admin/ticket')
    }).catch(error => {
    })
  }

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <CreateTicketTemplate></CreateTicketTemplate>
      <div className='text-center'>
        <Button onClick={createTicket}>登録する</Button>
      </div>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Edit
