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
    <footer className='content text-center'>
      <LineShareButton
        url={process.env.FRONTEND_URL + router.pathname}
        title='SquareEight'>
        <LineIcon
          round={true}/>
      </LineShareButton>
      <TwitterShareButton
        url={process.env.FRONTEND_URL + router.pathname}
        title='SquareEight'>
        <TwitterIcon
          round={true} />
      </TwitterShareButton>
      <FacebookShareButton
        url={process.env.FRONTEND_URL + router.pathname}
        title='SquareEight'>
        <FacebookIcon
          round={true} />
      </FacebookShareButton>
      <hr />
      <p className='footer-margin'>Copyright {footerCopyRightText} {new Date().getFullYear()}</p>
    </footer>
  )
}

export default MerchantCustomFooter
