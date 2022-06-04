import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import ServiceTemplate from '../../components/templates/ServiceTemplate'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import { Alert } from 'react-bootstrap'
import { useRouter } from 'next/router'

const Service: NextPage = () => {
  const [alertMessage, setAlertMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (router.query.status === 'verify_code') {
      setAlertMessage('ユーザ登録が完了しました。')
    }
  }, [router.query.status])

  return (
    <>
      {alertMessage != '' && <Alert variant='success' onClose={() => setAlertMessage('')} dismissible>{alertMessage}</Alert>}
      <IntroductionNavbar />
      <ServiceTemplate/>
    </>
  )
}

export default Service
