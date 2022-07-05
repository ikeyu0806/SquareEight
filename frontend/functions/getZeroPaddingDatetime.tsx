export const getZeroPaddingDate = ()  => {
  const date = new Date()
  return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
}

export const getZeroPaddingTime = ()  => {
  const date = new Date()
  return ('0' + (date.getHours() + 1)).slice(-2) + ':' + ('0' + (date.getMinutes() + 1)).slice(-2)
}
