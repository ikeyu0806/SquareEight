import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import { FacebookIcon } from 'react-share'

const MerchantCustomFooter = () => {
  const footerCopyRightText =  useSelector((state: RootState) => state.sharedComponent.footerCopyRightText)

  return (
    <footer className='content text-center'>
      <FacebookIcon
        round={true} />
      <hr />
      <p className='footer-margin'>Copyright {footerCopyRightText} {new Date().getFullYear()}</p>
    </footer>
  )
}

export default MerchantCustomFooter
