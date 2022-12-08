import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Container, Row, Col } from 'react-bootstrap'

const Edit: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  useEffect(() => {
    const fetchMerchantUser = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/merchant_users`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchMerchantUser()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>

    </MerchantUserAdminLayout>
  )
}

export default Edit
