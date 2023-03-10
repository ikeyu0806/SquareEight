// バックエンドにsignUpかloginの情報を送るためのlocalStorage操作メソッド
export const merchantUserGoogleAuthTypeKey = 'merchant_user_google_auth_type_key'

export const setMerchantUserGoogleAuthLocalStorageSignup = () => {
  localStorage.setItem(merchantUserGoogleAuthTypeKey, 'signup')
}

export const setMerchantUserGoogleAuthLocalStorageLogin = () => {
  localStorage.setItem(merchantUserGoogleAuthTypeKey, 'login')
}

export const getMerchantUserGoogleAuthLocalStorage = () => {
  return localStorage.getItem(merchantUserGoogleAuthTypeKey)
}

export const removeMerchantUserGoogleAuthLocalStorage = () => {
  localStorage.removeItem(merchantUserGoogleAuthTypeKey) 
}

export const endUserGoogleAuthTypeKey = 'end_user_google_auth_type_key'

export const setEndUserGoogleAuthLocalStorageSignup = () => {
  localStorage.setItem(endUserGoogleAuthTypeKey, 'signup')
}

export const setEndUserGoogleAuthLocalStorageLogin = () => {
  localStorage.setItem(endUserGoogleAuthTypeKey, 'login')
}

export const getEndUserGoogleAuthLocalStorage = () => {
  return localStorage.getItem(endUserGoogleAuthTypeKey)
}

export const removeEndUserGoogleAuthLocalStorage = () => {
  localStorage.removeItem(endUserGoogleAuthTypeKey) 
}
