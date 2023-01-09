import { localStorageEndUserRedirectPathKey } from 'constants/endUserRedirect'

export const endUserLoginRedirect = () => {
  let redirectPath = localStorage.getItem(localStorageEndUserRedirectPathKey)
  if (redirectPath === '') {
    redirectPath = '/customer_page'
  }
  localStorage.setItem(localStorageEndUserRedirectPathKey, '')
  window.location.href = String(redirectPath)
}
