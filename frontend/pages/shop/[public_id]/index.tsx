import { NextPage } from 'next'
import { useEffect } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import ShopPageTemplate from 'components/templates/ShopPageTemplate'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  useEffect(() => {
    const fetchShop = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/shops/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchShop()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <ShopPageTemplate></ShopPageTemplate>
    </MerchantUserAdminLayout>
  )
}

export default Index
