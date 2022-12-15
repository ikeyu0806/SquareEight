export const messageSendMethodText = (sendMethod: string) => {
  switch (sendMethod) {
    case 'Email':
      return 'メール'
    case 'LINE':
      return 'LINE'
    default:
      return ''
  }
}
