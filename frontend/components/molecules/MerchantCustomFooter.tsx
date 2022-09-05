import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const MerchantCustomFooter = () => {
  const footerCopyRightText =  useSelector((state: RootState) => state.sharedComponent.footerCopyRightText)

  return (
    <footer className='content text-center'>
      <hr />
      <p className='footer-margin'>Copyright {footerCopyRightText} {new Date().getFullYear()}</p>
    </footer>
  )
}

export default MerchantCustomFooter
