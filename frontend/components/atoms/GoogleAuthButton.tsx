import GoogleIcon from 'components/atoms/GoogleIcon'
interface Props {
  buttonText: string
}

const GoogleAuthButton = ({buttonText}: Props): JSX.Element => {
  return (
    <div className='mt20 text-center'>
      <a className='btn btn-outline-primary'
          href={`https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${process.env.GOOGLE_AUTH_END_USER_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_AUTH_END_USER_REDIRECT_URL}&scope=email&access_type=offline&approval_prompt=force`}>
        <GoogleIcon width={20} height={20} className={'mr10'}></GoogleIcon>{buttonText}
      </a>
    </div>
  )
}

export default GoogleAuthButton
