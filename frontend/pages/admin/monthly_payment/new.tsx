import { NextPage } from 'next'
import { useEffect } from 'react'
import CreateMonthlyPayment from 'components/templates/CreateMonthlyPayment'
import { Container } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import GuideStripeAccountRegister from 'components/templates/GuideStripeAccountRegister'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { publishStatusChanged } from 'redux/monthlyPaymentPlanSlice'
import { alertChanged } from 'redux/alertSlice'
import Unauthorized from 'components/templates/Unauthorized'

const New: NextPage = () => {
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
  const allowCreateMonthlyPaymentPlan = useSelector((state: RootState) => state.merchantUserPermission.allowCreateMonthlyPaymentPlan)
  const shops = useSelector((state: RootState) => state.account.shops)
  const monthlyPaymentPlanImage1File = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage1File)
  const monthlyPaymentPlanImage2File = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage2File)
  const monthlyPaymentPlanImage3File = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage3File)
  const monthlyPaymentPlanImage4File = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage4File)
  const monthlyPaymentPlanImage5File = useSelector((state: RootState) => state.monthlyPaymentPlan.monthlyPaymentPlanImage5File)

  useEffect(() => {
    dispatch(publishStatusChanged('Unpublish'))
  }, [dispatch])

  const onSubmit = () => {
    const params = new FormData()
    let ticketMasterParam = JSON.stringify(
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

    params.append('ticket_master', ticketMasterParam)
    params.append('monthly_payment_plan_image1_file', monthlyPaymentPlanImage1File as Blob)
    params.append('monthly_payment_plan_image2_file', monthlyPaymentPlanImage2File as Blob)
    params.append('monthly_payment_plan_image3_file', monthlyPaymentPlanImage3File as Blob)
    params.append('monthly_payment_plan_image4_file', monthlyPaymentPlanImage4File as Blob)
    params.append('monthly_payment_plan_image5_file', monthlyPaymentPlanImage5File as Blob)

    axios.post(`${process.env.BACKEND_URL}/api/internal/monthly_payment_plans`,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      router.push('/admin/monthly_payment')
      dispatch(alertChanged({message: '月額サブスクリプションを登録しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        {allowCreateMonthlyPaymentPlan === 'Allow' && <Container>
          {stripeAccountEnable === 'Enable' && <CreateMonthlyPayment></CreateMonthlyPayment>}
          {stripeAccountEnable === 'Disable' && <GuideStripeAccountRegister></GuideStripeAccountRegister>}
          {stripeAccountEnable === 'Enable' && <div className='text-center'>
          <Button onClick={onSubmit} className='mt10'>登録する</Button>
        </div>}
        </Container>}
        {allowCreateMonthlyPaymentPlan === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default New
