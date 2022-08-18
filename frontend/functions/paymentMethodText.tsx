export const paymentMethodText = (paymentMethod: string) => {
  switch (paymentMethod) {
    case 'localPayment':
      return '現地払い'
    case 'creditCardPayment':
      return '現地払い'
    case 'ticket':
      return 'チケット払い'
    case 'monthlyPaymentPlan':
      return '月額課金'
    default:
      return ''
  }
}
