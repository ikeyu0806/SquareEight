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
  const hideShareButton =  useSelector((state: RootState) => state.sharedComponent.hideShareButton)

  return (
    <footer className='content text-center'>
      {hideShareButton !== true &&
      <>
        <div className='mt20'>
          <LineShareButton
            url={process.env.FRONTEND_URL + router.asPath}
            title='SquareEight'>
            <LineIcon
              size={40}
              round={true}/>
          </LineShareButton>
          <TwitterShareButton
            className='ml20'
            url={process.env.FRONTEND_URL + router.asPath}
            title='SquareEight'>
            <TwitterIcon
              size={40}
              round={true} />
          </TwitterShareButton>
          <FacebookShareButton
            className='ml20'
            url={process.env.FRONTEND_URL + router.asPath}
            title='SquareEight'>
            <FacebookIcon
              size={40}
              round={true} />
          </FacebookShareButton>
        </div>
      </>}
      <p className='footer-margin mt20'>Copyright {footerCopyRightText} {new Date().getFullYear()}</p>
    </footer>
  )
}

export default MerchantCustomFooter
