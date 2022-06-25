import { NextPage } from 'next'
import React from 'react'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <AdminNavbar></AdminNavbar>
        <br/>
        <br/>
        <Button onClick={() => router.push('/admin/sales_transfer/register_business_info')}>振込先口座登録</Button>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Index
