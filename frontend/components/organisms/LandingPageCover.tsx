import React from 'react'
import { useRouter } from 'next/router'
import homeStyles from 'styles/Home.module.css'
import LpSightUpLinkButton from 'components/atoms/LpSightUpLinkButton'

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
        <LpSightUpLinkButton />
      </div>
    </div>
  )
}

export default LandingPageCover
