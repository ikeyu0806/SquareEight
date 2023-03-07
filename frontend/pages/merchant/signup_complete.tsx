import React, { useEffect } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useRouter } from 'next/router'

const SignupComplete = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => router.push('/admin/dashboard'), 1000)
  }, [router])
  return (
    <MerchantUserAdminLayout>
      <div className='text-center'>
        <span className='spinner-border spinner-border-sm'></span>
      </div>
    </MerchantUserAdminLayout>
  )
}

export default SignupComplete
