export const resourceReceptionTimeSettingText = (receptionTimeSetting: string, price: number, consumeNumber: number, reserveCount: number) => {
  switch (receptionTimeSetting) {
    case 'NotSet':
      return '制限なし'
    case 'AccountBusinessHour':
      return '営業時間に準ずる'
    case 'ResourceBusinessHour':
      return '個別に設定する'
    default:
      return ''
  }
}
