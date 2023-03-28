import React from 'react'
import { useRouter } from 'next/router'
import homeStyles from 'styles/Home.module.css'

const LpSightUpLinkButton = () => {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push('/merchant/signup')}
      className={homeStyles.business_account_signup_btn}>無料でお試し</button>
  )
}

export default LpSightUpLinkButton
