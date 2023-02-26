import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const CreateResourceLimitAlert = () => {
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <>
      {servicePlan === 'Free' && <Alert className='text-center'>フリープランではリソースは3件まで登録できます。</Alert>}
      {servicePlan === 'Light' && <Alert className='text-center'>ライトプランではリソースは10件まで登録できます。</Alert>}
    </>
  )
}

export default CreateResourceLimitAlert
