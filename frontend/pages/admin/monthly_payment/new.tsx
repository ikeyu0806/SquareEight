import { NextPage } from 'next'
import CreateMonthlyPayment from 'components/templates/CreateMonthlyPayment'
import { Container } from 'react-bootstrap'
import AdminNavbarTemplate from 'components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()

  const name = useSelector((state: RootState) => state.monthlyPaymentPlan.name)
  const price = useSelector((state: RootState) => state.monthlyPaymentPlan.price)
  const reserveIsUnlimited = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIsUnlimited)
  const reserveIntervalNumber = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalNumber)
  const reserveIntervalUnit = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalUnit)
  const enableReserveCount = useSelector((state: RootState) => state.monthlyPaymentPlan.enableReserveCount)
  const description = useSelector((state: RootState) => state.monthlyPaymentPlan.description)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/monthly_payment_plans`,
    {
      monthly_payment_plans: {
        name: name,
        price: price,
        reserve_is_unlimited: reserveIsUnlimited,
        reserve_interval_number: reserveIntervalNumber,
        reserve_interval_unit: reserveIntervalUnit,
        enable_reserve_count: enableReserveCount,
        description: description
      }
    },
    {
      headers: {
        'Session-Id': cookies._smartlesson_session
      }
    }).then(response => {
      router.push('/admin/monthly_payment')
      dispatch(alertChanged({message: '月額課金プランを登録しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <AdminNavbarTemplate></AdminNavbarTemplate>
      <Container>
        <CreateMonthlyPayment></CreateMonthlyPayment>
      </Container>
      <div className='text-center'>
        <Button onClick={onSubmit} className='mt10'>登録する</Button>
      </div>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default New
