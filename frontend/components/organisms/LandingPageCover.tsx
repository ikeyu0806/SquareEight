import React from 'react'
import { useRouter } from 'next/router'
import homeStyles from 'styles/Home.module.css'

const LandingPageCover = (): JSX.Element => {
  const router = useRouter()
  return (
    <div className={homeStyles.cover_img_parent}>
      <img
        className={homeStyles.cover_img}
        src='/images/top_cover_min.webp'
        alt='Top Cover' />
      <p className={homeStyles.headline_service_name}>
        SquareEight
      </p>
      <div className={homeStyles.service_description}>
        <button
          onClick={() => router.push('/merchant/signup')}
          className={homeStyles.business_account_signup_btn}>無料でお試し</button>
      </div>
    </div>
  )
}

export default LandingPageCover
