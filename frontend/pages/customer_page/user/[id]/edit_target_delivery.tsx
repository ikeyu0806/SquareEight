import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { Button } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import CreateDeliveryTarget from 'components/templates/CreateDeliveryTarget'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import axios from 'axios'

const EditTargetDelivery: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const router = useRouter()
  const dispatch = useDispatch()
  const firstName = useSelector((state: RootState) => state.deliveryTarget.firstName)
  const lastName = useSelector((state: RootState) => state.deliveryTarget.lastName)
  const postalCode = useSelector((state: RootState) => state.deliveryTarget.postalCode)
  const state = useSelector((state: RootState) => state.deliveryTarget.state)
  const city = useSelector((state: RootState) => state.deliveryTarget.city)
  const town = useSelector((state: RootState) => state.deliveryTarget.town)
  const line1 = useSelector((state: RootState) => state.deliveryTarget.line1)
  const line2 = useSelector((state: RootState) => state.deliveryTarget.line2)
  const phoneNumber = useSelector((state: RootState) => state.deliveryTarget.phoneNumber)
  const isDefault = useSelector((state: RootState) => state.deliveryTarget.isDefault)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/delivery_targets/`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then((response) => {
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._gybuilder_end_user_session])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/end_users/${router.query.id}/register_delivery_target`,
    {
      delivery_target: {
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then(response => {
      router.push('/customer_page/mypage')
      dispatch(alertChanged({message: '更新しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <EndUserLoginLayout>
      <CreateDeliveryTarget></CreateDeliveryTarget>
      <div className='mt30 text-center'>
        <Button onClick={onSubmit}>更新する</Button>
      </div>
    </EndUserLoginLayout>
  )
}

export default EditTargetDelivery
