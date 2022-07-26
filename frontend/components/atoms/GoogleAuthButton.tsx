import GoogleIcon from 'components/atoms/GoogleIcon'
interface Props {
  buttonText: string
  buttonHref: string
}

const GoogleAuthButton = ({buttonText, buttonHref}: Props): JSX.Element => {
  return (
    <div className='mt20 text-center'>
      <a className='btn btn-outline-primary'
         href={buttonHref}>
        <GoogleIcon width={20} height={20} className={'mr10'}></GoogleIcon>{buttonText}
      </a>
    </div>
  )
}

export default GoogleAuthButton
