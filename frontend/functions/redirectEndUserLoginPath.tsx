import { localStorageEndUserRedirectPathKey } from 'constants/endUserRedirect'

export const redirectEndUserLoginPath = (redirectUrl: string) => {
  localStorage.setItem(localStorageEndUserRedirectPathKey, redirectUrl)
  window.location.href = '/customer/login'
}
