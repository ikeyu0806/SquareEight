import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const CreateResourceLimitAlert = () => {
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <>
      {servicePlan === 'Free' && <Alert className='text-center'>フリープランではリソースは3件まで送信できます。</Alert>}
      {servicePlan === 'Light' && <Alert className='text-center'>ライトプランではメールは10件まで送信できます。</Alert>}
    </>
  )
}

export default CreateResourceLimitAlert
