import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const PlanLabel = (): JSX.Element => {
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <span className='badge bg-info ml10'>
      {servicePlan === 'Free' && 'フリープラン'}
      {servicePlan === 'Light' && 'ライトプラン'}
      {servicePlan === 'Standard' && 'スタンダードプラン'}
      {servicePlan === 'Premium' && 'プレミアムプラン'}
    </span>
  )
}

export default PlanLabel
