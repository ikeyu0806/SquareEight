import { NextPage } from 'next'
import React, { useEffect } from 'react'
import CreateMonthlyPayment from 'components/templates/CreateMonthlyPayment'
import { Container } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import GuideStripeAccountRegister from 'components/templates/GuideStripeAccountRegister'
import Unauthorized from 'components/templates/Unauthorized'
import { priceChanged,
         nameChanged,
         reserveIsUnlimitedChanged,
         reserveIntervalNumberChanged,
         reserveIntervalUnitChanged,
         enableReserveCountChanged,
         descriptionChanged,
         publishStatusChanged,
         monthlyPaymentPlanImage1ImagePublicUrlChanged,
         monthlyPaymentPlanImage2ImagePublicUrlChanged,
         monthlyPaymentPlanImage3ImagePublicUrlChanged,
         monthlyPaymentPlanImage4ImagePublicUrlChanged,
         monthlyPaymentPlanImage5ImagePublicUrlChanged,
         selectedShopIdsChanged } from 'redux/monthlyPaymentPlanSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  const name = useSelector((state: RootState) => state.monthlyPaymentPlan.name)
  const price = useSelector((state: RootState) => state.monthlyPaymentPlan.price)
  const reserveIsUnlimited = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIsUnlimited)
  const reserveIntervalNumber = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalNumber)
  const reserveIntervalUnit = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalUnit)
  const enableReserveCount = useSelector((state: RootState) => state.monthlyPaymentPlan.enableReserveCount)
  const description = useSelector((state: RootState) => state.monthlyPaymentPlan.description)
  const publishStatus = useSelector((state: RootState) => state.monthlyPaymentPlan.publishStatus)
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)
  const allowUpdateMonthlyPaymentPlan = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateMonthlyPaymentPlan)
  const shops = useSelector((state: RootState) => state.account.shops)
  const monthlyPaymentPlanImage1File = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage1File)
  const monthlyPaymentPlanImage2File = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage2File)
  const monthlyPaymentPlanImage3File = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage3File)
  const monthlyPaymentPlanImage4File = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage4File)
  const monthlyPaymentPlanImage5File = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage5File)

  useEffect(() => {
    const fetchMonthlyPaymentPlan = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/monthly_payment_plans/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        dispatch(nameChanged(response.data.monthly_payment_plan.name))
        dispatch(priceChanged(response.data.monthly_payment_plan.price))
        dispatch(reserveIsUnlimitedChanged(response.data.monthly_payment_plan.reserve_is_unlimited))
        dispatch(reserveIntervalNumberChanged(response.data.monthly_payment_plan.reserve_interval_number))
        dispatch(reserveIntervalUnitChanged(response.data.monthly_payment_plan.reserve_interval_unit))
        dispatch(enableReserveCountChanged(response.data.monthly_payment_plan.enable_reserve_count))
        dispatch(descriptionChanged(response.data.monthly_payment_plan.description))
        dispatch(selectedShopIdsChanged(response.data.monthly_payment_plan.selected_shop_ids))
        dispatch(publishStatusChanged(response.data.monthly_payment_plan.publish_status))
        dispatch(monthlyPaymentPlanImage1ImagePublicUrlChanged(response.data.monthly_payment_plan.image1_account_s3_image_public_url))
        dispatch(monthlyPaymentPlanImage2ImagePublicUrlChanged(response.data.monthly_payment_plan.image2_account_s3_image_public_url))
        dispatch(monthlyPaymentPlanImage3ImagePublicUrlChanged(response.data.monthly_payment_plan.image3_account_s3_image_public_url))
        dispatch(monthlyPaymentPlanImage4ImagePublicUrlChanged(response.data.monthly_payment_plan.image4_account_s3_image_public_url))
        dispatch(monthlyPaymentPlanImage5ImagePublicUrlChanged(response.data.monthly_payment_plan.image5_account_s3_image_public_url))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchMonthlyPaymentPlan()
  }, [router.query.public_id, cookies._square_eight_merchant_session, dispatch])

  const onSubmit = () => {
    const params = new FormData()
    let monthlyPaymentPlanParam = JSON.stringify(
      {
        monthly_payment_plans: {
          name: name,
          price: price,
          reserve_is_unlimited: reserveIsUnlimited,
          reserve_interval_number: reserveIntervalNumber,
          reserve_interval_unit: reserveIntervalUnit,
          enable_reserve_count: enableReserveCount,
          description: description,
          publish_status: publishStatus,
          shops: shops
        }
      }
    )

    params.append('monthly_payment_plans', monthlyPaymentPlanParam)
    params.append('monthly_payment_plan_image1_file', monthlyPaymentPlanImage1File as Blob)
    params.append('monthly_payment_plan_image2_file', monthlyPaymentPlanImage2File as Blob)
    params.append('monthly_payment_plan_image3_file', monthlyPaymentPlanImage3File as Blob)
    params.append('monthly_payment_plan_image4_file', monthlyPaymentPlanImage4File as Blob)
    params.append('monthly_payment_plan_image5_file', monthlyPaymentPlanImage5File as Blob)

    axios.post(`${process.env.BACKEND_URL}/api/internal/monthly_payment_plans/${router.query.public_id}/update`,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      router.push('/admin/monthly_payment')
      dispatch(alertChanged({message: '月額サブスクリプションを更新しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        {allowUpdateMonthlyPaymentPlan === 'Allow' && <Container>
          {stripeAccountEnable === 'Enable' && <CreateMonthlyPayment showDeleteButton={true}></CreateMonthlyPayment>}
          {stripeAccountEnable === 'Disable' && <GuideStripeAccountRegister></GuideStripeAccountRegister>}
          <div className='text-center'>
            {stripeAccountEnable === 'Enable' && <Button onClick={onSubmit} className='mt10'>更新する</Button>}
          </div>
        </Container>}
        {allowUpdateMonthlyPaymentPlan === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Edit
