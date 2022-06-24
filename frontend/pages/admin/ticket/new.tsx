import React from 'react'
import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import CreateTicketTemplate from 'components/templates/CreateTicketTemplate'
import { Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const New: NextPage = () => {
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()
  const name = useSelector((state: RootState) => state.ticketMaster.name)
  const issueNumber = useSelector((state: RootState) => state.ticketMaster.issueNumber)
  const price = useSelector((state: RootState) => state.ticketMaster.price)

  const createTicket = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/ticket_masters`,
    {
      ticket_master: {
        name: name,
        issue_number: issueNumber,
        price: price
      }
    },
    {
      headers: {
        'Session-Id': cookies._smartlesson_session
      }
    }).then(response => {
      alert('success')
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

export default New
