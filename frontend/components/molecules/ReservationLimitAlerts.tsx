import { Alert } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const ReservationLimitAlerts = () => {
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <>
      {servicePlan === 'Free' && <Alert variant='warning'>フリープランでは予約の最大受付可能数は30日辺り50件となります</Alert>}
      {servicePlan === 'Light' && <Alert variant='warning'>スタンダードプランでは予約の最大受付可能数は30日辺り500件となります</Alert>}
      {servicePlan === 'Standard' && <Alert variant='warning'>プレミアムプランでは予約の最大受付可能数は30日辺り2000件となります</Alert>}
    </>
  )
}

export default ReservationLimitAlerts
