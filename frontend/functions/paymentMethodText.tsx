export const paymentMethodText = (paymentMethod: string, price: number, consumeNumber: number, reserveCount: number) => {
  console.log("!!", paymentMethod)
  switch (paymentMethod) {
    case 'localPayment':
      return '現地払い ' + `￥${price * reserveCount}`
    case 'creditCardPayment':
      return 'クレジットカード払い ' + `￥${price * reserveCount}`
    case 'ticket':
      return 'チケット払い ' + `消費枚数: ${consumeNumber}`
    case 'monthlyPaymentPlan':
      return '月額課金'
    default:
      return ''
  }
}
