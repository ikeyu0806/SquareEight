import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import { FacebookIcon,
         FacebookShareButton,
         LineIcon,
         LineShareButton,
         TwitterShareButton,
         TwitterIcon  } from 'react-share'
import { useRouter } from 'next/router'

const MerchantCustomFooter = () => {
  const router = useRouter()
  const footerCopyRightText =  useSelector((state: RootState) => state.sharedComponent.footerCopyRightText)

  return (
    <footer className='content text-center mt20'>
      <LineShareButton
        url={process.env.FRONTEND_URL + router.pathname}
        title='SquareEight'>
        <LineIcon
          size={40}
          round={true}/>
      </LineShareButton>
      <TwitterShareButton
        className='ml20'
        url={process.env.FRONTEND_URL + router.pathname}
        title='SquareEight'>
        <TwitterIcon
          size={40}
          round={true} />
      </TwitterShareButton>
      <FacebookShareButton
        className='ml20'
        url={process.env.FRONTEND_URL + router.pathname}
        title='SquareEight'>
        <FacebookIcon
          size={40}
          round={true} />
      </FacebookShareButton>
      <hr />
      <p className='footer-margin'>Copyright {footerCopyRightText} {new Date().getFullYear()}</p>
    </footer>
  )
}

export default MerchantCustomFooter
