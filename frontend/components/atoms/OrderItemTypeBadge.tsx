interface Props {
  itemType: string
}

const OrderItemTypeBadge = ({itemType}: Props): JSX.Element => {
  return (
    <span className='badge bg-info ml10'>
      {itemType === 'Product' && '物販商品'}
      {itemType === 'TicketMaster' && '回数券'}
      {itemType === 'MonthlyPaymentPlan' && '月額サブスクリプション'}
    </span>
  )
}

export default OrderItemTypeBadge
