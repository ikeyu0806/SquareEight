import { Alert } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const ResourceLimitAlert = () => {
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <>
      {['Free', 'Light'].includes(servicePlan) && <Alert variant='warning'>スタンダードプラン以上で設備・備品やスタッフなどリソースごとの予約受付可能数の制限ができます。</Alert>}
    </>
  )
}

export default ResourceLimitAlert
