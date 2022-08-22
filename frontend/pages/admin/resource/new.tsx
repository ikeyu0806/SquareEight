import { NextPage } from 'next'
import CreateResource from 'components/templates/CreateResource'
import { Container } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  const name = useSelector((state: RootState) => state.resource.name)
  const quantity = useSelector((state: RootState) => state.resource.quantity)
  const receptionTimeSetting = useSelector((state: RootState) => state.resource.receptionTimeSetting)
  const monStart = useSelector((state: RootState) => state.businessHour.monStart)
  const monEnd = useSelector((state: RootState) => state.businessHour.monEnd)
  const tueStart = useSelector((state: RootState) => state.businessHour.tueStart)
  const tueEnd = useSelector((state: RootState) => state.businessHour.tueEnd)
  const wedStart = useSelector((state: RootState) => state.businessHour.wedStart)
  const wedEnd = useSelector((state: RootState) => state.businessHour.wedEnd)
  const thuStart = useSelector((state: RootState) => state.businessHour.thuStart)
  const thuEnd = useSelector((state: RootState) => state.businessHour.thuEnd)
  const friStart = useSelector((state: RootState) => state.businessHour.friStart)
  const friEnd = useSelector((state: RootState) => state.businessHour.friEnd)
  const satStart = useSelector((state: RootState) => state.businessHour.satStart)
  const satEnd = useSelector((state: RootState) => state.businessHour.satEnd)
  const sunStart = useSelector((state: RootState) => state.businessHour.sunStart)
  const sunEnd = useSelector((state: RootState) => state.businessHour.sunEnd)
  const holidayStart = useSelector((state: RootState) => state.businessHour.holidayStart)
  const holidayEnd = useSelector((state: RootState) => state.businessHour.holidayEnd)
  const monBreakStart = useSelector((state: RootState) => state.businessHour.monBreakStart)
  const monBreakEnd = useSelector((state: RootState) => state.businessHour.monBreakEnd)
  const tueBreakStart = useSelector((state: RootState) => state.businessHour.tueBreakStart)
  const tueBreakEnd = useSelector((state: RootState) => state.businessHour.tueBreakEnd)
  const wedBreakStart = useSelector((state: RootState) => state.businessHour.wedBreakStart)
  const wedBreakEnd = useSelector((state: RootState) => state.businessHour.wedBreakEnd)
  const thuBreakStart = useSelector((state: RootState) => state.businessHour.thuBreakStart)
  const thuBreakEnd = useSelector((state: RootState) => state.businessHour.thuBreakEnd)
  const friBreakStart = useSelector((state: RootState) => state.businessHour.friBreakStart)
  const friBreakEnd = useSelector((state: RootState) => state.businessHour.friBreakEnd)
  const satBreakStart = useSelector((state: RootState) => state.businessHour.satBreakStart)
  const satBreakEnd = useSelector((state: RootState) => state.businessHour.satBreakEnd)
  const sunBreakStart = useSelector((state: RootState) => state.businessHour.sunBreakStart)
  const sunBreakEnd = useSelector((state: RootState) => state.businessHour.sunBreakEnd)
  const holidayBreakStart = useSelector((state: RootState) => state.businessHour.holidayBreakStart)
  const holidayBreakEnd = useSelector((state: RootState) => state.businessHour.holidayBreakEnd)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/resources`,
    {
      resources: {
        name: name,
        quantity: quantity,
        reception_time_setting: receptionTimeSetting,
        mon_start: monStart,
        mon_end: monEnd,
        tue_start: tueStart,
        tue_end: tueEnd,
        wed_start: wedStart,
        wed_end: wedEnd,
        thu_start: thuStart,
        thu_end: thuEnd,
        fri_start: friStart,
        fri_end: friEnd,
        sat_start: satStart,
        sat_end: satEnd,
        sun_start: sunStart,
        sun_end: sunEnd,
        holiday_start: holidayStart,
        holiday_end: holidayEnd,
        mon_break_start: monBreakStart,
        mon_break_end: monBreakEnd,
        tue_break_start: tueBreakStart,
        tue_break_end: tueBreakEnd,
        wed_break_start: wedBreakStart,
        wed_break_end: wedBreakEnd,
        thu_break_start: thuBreakStart,
        thu_break_end: thuBreakEnd,
        fri_break_start: friBreakStart,
        fri_break_end: friBreakEnd,
        sat_break_start: satBreakStart,
        sat_break_end: satBreakEnd,
        sun_break_start: sunBreakStart,
        sun_break_end: sunBreakEnd,
        holiday_break_start: holidayBreakStart,
        holiday_break_end: holidayBreakEnd,
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      router.push('/admin/resource')
      dispatch(alertChanged({message: 'リソースを登録しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <CreateResource></CreateResource>
        </Container>
        <div className='text-center'>
          <Button onClick={onSubmit} className='mt10'>登録する</Button>
        </div>
      </MerchantUserAdminLayout>
    </>
  )
}

export default New
