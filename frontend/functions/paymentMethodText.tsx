export const paymentMethodText = (paymentMethod: string, price: number, consumeNumber: number) => {
  switch (paymentMethod) {
    case 'localPayment':
      return '現地払い ' + `￥${price}`
    case 'creditCardPayment':
      return 'クレジットカード払い ' + `￥${price}`
    case 'ticket':
      return 'チケット払い ' + `消費枚数: ${consumeNumber}`
    case 'monthlyPaymentPlan':
      return '月額課金'
    default:
      return ''
  }
}
