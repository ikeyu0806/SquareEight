import GoogleIcon from 'components/atoms/GoogleIcon'
import { useRouter } from 'next/router'
import { setMerchantUserGoogleAuthLocalStorageSignup,
         setMerchantUserGoogleAuthLocalStorageLogin,
         setEndUserGoogleAuthLocalStorageSignup,
         setEndUserGoogleAuthLocalStorageLogin } from 'functions/googleAuthLocalStorage'
interface Props {
  buttonText: string
  buttonHref: string
  isMerchantUserSignUp?: boolean
  isEndUserSignUp?: boolean
  isMerchantUserLogin?: boolean
  isEndUserLogin?: boolean
}

const GoogleAuthButton = ({buttonText, buttonHref, isMerchantUserSignUp, isMerchantUserLogin, isEndUserSignUp, isEndUserLogin}: Props): JSX.Element => {
  const router = useRouter()

  const onSubmit = () => {
    // ビジネスアカウント登録時はコンバージョン計測
    isMerchantUserSignUp && (window as any).gtag("event", "business_account_signup_complete", {
      // 一応categoryとlabel追加
      event_category: "Google Auth",
      event_label: "Google Auth",
    })
    // ログイン、サインアップ判定用のlocalStorage設定
    isMerchantUserSignUp && 
      setMerchantUserGoogleAuthLocalStorageSignup()
    isMerchantUserLogin &&
      setMerchantUserGoogleAuthLocalStorageLogin()
    isEndUserSignUp &&
      setEndUserGoogleAuthLocalStorageSignup()
    isEndUserLogin &&
      setEndUserGoogleAuthLocalStorageLogin()
    router.push(buttonHref)
  }

  return (
    <div className='mt20 text-center'>
      <a className='btn btn-outline-primary'
         onClick={() => onSubmit()}>
        <GoogleIcon width={20} height={20} className={'mr10'}></GoogleIcon>{buttonText}
      </a>
    </div>
  )
}

export default GoogleAuthButton
