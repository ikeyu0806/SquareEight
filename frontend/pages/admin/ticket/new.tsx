import React from 'react'
import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import CreateTicketTemplate from 'components/templates/CreateTicketTemplate'

const New: NextPage = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <CreateTicketTemplate></CreateTicketTemplate>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default New
