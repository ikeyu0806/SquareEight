export const receptionTypeText = (receptionType: string) => {
  switch (receptionType) {
    case 'Immediate':
      return '即時予約'
    case 'Temporary':
      return '仮予約'
    case 'PhoneOnly':
      return '電話のみ予約'
    case 'Lottery':
      return '抽選予約'
    default:
      return ''
  }
}
