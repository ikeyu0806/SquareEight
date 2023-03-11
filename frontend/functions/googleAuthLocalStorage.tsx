// バックエンドにsignUpかloginの情報を送るためのlocalStorage操作メソッド
export const merchantUserGoogleAuthTypeKey = 'merchant_user_google_auth_type_key'
export const SIGNUP_CONSTANT = 'signup'
export const LOGIN_CONSTANT = 'login'

export const setMerchantUserGoogleAuthLocalStorageSignup = () => {
  localStorage.setItem(merchantUserGoogleAuthTypeKey, SIGNUP_CONSTANT)
}

export const setMerchantUserGoogleAuthLocalStorageLogin = () => {
  localStorage.setItem(merchantUserGoogleAuthTypeKey, LOGIN_CONSTANT)
}

export const getMerchantUserGoogleAuthLocalStorage = () => {
  return localStorage.getItem(merchantUserGoogleAuthTypeKey) || ''
}

export const removeMerchantUserGoogleAuthLocalStorage = () => {
  localStorage.removeItem(merchantUserGoogleAuthTypeKey) 
}

export const endUserGoogleAuthTypeKey = 'end_user_google_auth_type_key'

export const setEndUserGoogleAuthLocalStorageSignup = () => {
  localStorage.setItem(endUserGoogleAuthTypeKey, SIGNUP_CONSTANT)
}

export const setEndUserGoogleAuthLocalStorageLogin = () => {
  localStorage.setItem(endUserGoogleAuthTypeKey, LOGIN_CONSTANT)
}

export const getEndUserGoogleAuthLocalStorage = () => {
  return localStorage.getItem(endUserGoogleAuthTypeKey) || ''
}

export const removeEndUserGoogleAuthLocalStorage = () => {
  localStorage.removeItem(endUserGoogleAuthTypeKey) 
}
