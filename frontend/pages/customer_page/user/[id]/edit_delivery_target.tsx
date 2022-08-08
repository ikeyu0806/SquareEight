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
import { ListGroup, Row, Col, Container } from 'react-bootstrap'
import { DeliveryTargetParam } from 'interfaces/DeliveryTargetParam'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const EditTargetDelivery: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const router = useRouter()
  const dispatch = useDispatch()
  const [deliveryTargets, setDeliveryTargets] = useState<DeliveryTargetParam[]>([])
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
      console.log(response.data.delivery_targets)
      setDeliveryTargets(response.data.delivery_targets)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._gybuilder_end_user_session])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/delivery_targets/`,
    {
      delivery_target: {
        first_name: firstName,
        last_name: lastName,
        postal_code: postalCode,
        state: state,
        city: city,
        town: town,
        line1: line1,
        line2: line2,
        phone_number: phoneNumber,
        is_default: isDefault,
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

  const updateDefaultDeliveryTarget = (delivery_target_id: string) => {
    swalWithBootstrapButtons.fire({
      title: 'デフォルトのお届け先を更新します',
      text: '更新してもよろしいですか？',
      icon: 'question',
      confirmButtonText: '更新する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.BACKEND_URL}/api/internal/delivery_targets/${delivery_target_id}/update_default`,
        {},
        {
          headers: {
            'Session-Id': cookies._gybuilder_end_user_session
          }
        }).then(response => {
          dispatch(alertChanged({message: 'お支払いカードを変更しました', show: true}))
          location.reload()
        }).catch(error => {
          dispatch(alertChanged({message: "登録失敗しました", show: true, type: 'danger'}))
        })
      }
    })
  }

  const deleteDeliveryTarget = (delivery_target_id: string) => {
    swalWithBootstrapButtons.fire({
      title: '削除します',
      text: '削除してもよろしいですか？',
      icon: 'question',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/delivery_targets/${delivery_target_id}`, {
          headers: { 
            'Session-Id': cookies._gybuilder_end_user_session
          }
        })
        location.reload()
      }
    })
  }

  const validateSubmit = () => {
    if (!firstName || !lastName || !postalCode || !state || !city || !town || !line1 || !phoneNumber) {
      return true
    } else {
      return false
    }
  }

  return (
    <EndUserLoginLayout>
      <Container className='mt30'>
        <Row>
          <Col md={2} lg={3}></Col>
          <Col md={8} lg={6}>
          <h4 className='mt20'>登録済みお届け先</h4>
            {<ListGroup>
              {deliveryTargets?.map((target, i) => {
                return (
                  <ListGroup.Item key={i}>
                    〒{target.postal_code} {target.last_name}{target.first_name}<br />
                    {target.state}{target.city}{target.town}{target.line1}{target.line2}
                    {target.is_default 
                    ? <><span className='badge bg-info ml10'>デフォルトのお届け先に設定されています </span></>
                    : <>
                        <Button size='sm'
                                className='ml10'
                                onClick={() => updateDefaultDeliveryTarget(target.id)}>お届け先に設定する</Button>
                        <Button variant='danger'
                                size='sm'
                                className='ml10'
                                onClick={() => deleteDeliveryTarget(target.id)}>削除する</Button>
                      </>}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>}
            <h4 className='mt50 mb20'>新規登録</h4>
            <CreateDeliveryTarget showIsDefaultSetting={true}></CreateDeliveryTarget>
            <div className='mt30 text-center'>
              <Button
                disabled={validateSubmit()}
                onClick={onSubmit}>
                登録する
              </Button>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </EndUserLoginLayout>
  )
}

export default EditTargetDelivery
