import { NextPage } from 'next'
import { useEffect } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import ShopPageTemplate from 'components/templates/ShopPageTemplate'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { nameChanged,
         description1Changed,
         description2Changed,
         postalCodeChanged,
         stateChanged,
         cityChanged,
         townChanged,
         line1Changed,
         line2Changed,
         accessInfoChanged,
         parkingLotDisplayStatusChanged,
         remarksChanged,
         pageCoverSlide1ImagePublicUrlChanged,
         pageCoverSlide2ImagePublicUrlChanged,
         pageCoverSlide3ImagePublicUrlChanged,
         brandImageImagePublicUrlChanged,
         shopImage1ImagePublicUrlChanged,
         shopImage2ImagePublicUrlChanged,
         shopImage3ImagePublicUrlChanged } from 'redux/shopSlice'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const dispatch = useDispatch()

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
        console.log(response.data.shop)
        dispatch(nameChanged(response.data.shop.name))
        dispatch(description1Changed(response.data.shop.description1))
        dispatch(description2Changed(response.data.shop.description2))
        dispatch(postalCodeChanged(response.data.shop.postal_code))
        dispatch(stateChanged(response.data.shop.state))
        dispatch(cityChanged(response.data.shop.city))
        dispatch(townChanged(response.data.shop.town))
        dispatch(line1Changed(response.data.shop.line1))
        dispatch(line2Changed(response.data.shop.line2))
        dispatch(accessInfoChanged(response.data.shop.access_info))
        dispatch(remarksChanged(response.data.shop.remarks))
        dispatch(pageCoverSlide1ImagePublicUrlChanged(response.data.shop.page_cover_slide1_image_public_url))
        dispatch(pageCoverSlide2ImagePublicUrlChanged(response.data.shop.page_cover_slide2_image_public_url))
        dispatch(pageCoverSlide3ImagePublicUrlChanged(response.data.shop.page_cover_slide3_image_public_url))
        dispatch(brandImageImagePublicUrlChanged(response.data.shop.brand_image_public_url))
        dispatch(shopImage1ImagePublicUrlChanged(response.data.shop.shop_image1_public_url))
        dispatch(shopImage2ImagePublicUrlChanged(response.data.shop.shop_image2_public_url))
        dispatch(shopImage3ImagePublicUrlChanged(response.data.shop.shop_image3_public_url))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchShop()
  }, [dispatch, router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <ShopPageTemplate></ShopPageTemplate>
    </MerchantUserAdminLayout>
  )
}

export default Index
