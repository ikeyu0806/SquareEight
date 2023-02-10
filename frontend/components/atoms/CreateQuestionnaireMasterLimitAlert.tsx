import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const CreateQuestionnaireMasterLimitAlert = () => {
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <>
      {servicePlan === 'Free' && <Alert className='text-center'>フリープランではアンケートマスタは3件まで送信できます。</Alert>}
    </>
  )
}

export default CreateQuestionnaireMasterLimitAlert
