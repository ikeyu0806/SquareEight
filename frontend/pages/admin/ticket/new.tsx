import React from 'react'
import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import CreateTicketTemplate from 'components/templates/CreateTicketTemplate'
import { Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
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
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '登録しました', show: true}))
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

export default New
