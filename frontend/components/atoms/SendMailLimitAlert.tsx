import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const SendMailLimitAlert = () => {
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <>
      {servicePlan === 'Free' && <Alert className='text-center'>フリープランではメールは10件まで送信できます。</Alert>}
      {servicePlan === 'Light' && <Alert className='text-center'>ライトプランではメールは1000件まで送信できます。</Alert>}
      {servicePlan === 'Standard' && <Alert className='text-center'>スタンダードプランではメールは3000件まで送信できます。</Alert>}
    </>
  )
}

export default SendMailLimitAlert
