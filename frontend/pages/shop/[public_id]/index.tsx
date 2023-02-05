import { NextPage } from 'next'
import { useEffect } from 'react'
import ShopPageTemplate from 'components/templates/ShopPageTemplate'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import { nameChanged,
         phoneNumberChanged,
         description1Changed,
         description2Changed,
         description3Changed,
         description4Changed,
         description5Changed,
         description6Changed,
         postalCodeChanged,
         stateChanged,
         cityChanged,
         townChanged,
         line1Changed,
         line2Changed,
         accessInfoChanged,
         parkingLotGuidanceChanged,
         businessHoursTextChanged,
         remarksChanged,
         shopImage1ImagePublicUrlChanged,
         shopImage2ImagePublicUrlChanged,
         shopImage3ImagePublicUrlChanged,
         shopImage4ImagePublicUrlChanged,
         shopImage5ImagePublicUrlChanged,
         shopImage6ImagePublicUrlChanged,
         reserveFrameInfoChanged,
         monthlyPatmentPlanInfoChanged,
         ticketMasterInfoChanged,
         productInfoChanged,
         webpagesChanged } from 'redux/shopSlice'
import {  navbarBrandTextChanged,
          navbarBrandTypeChanged,
          navbarBrandImageChanged,
          navbarBrandImageWidthChanged,
          navbarBrandImageHeightChanged,
          navbarBrandBackgroundColorChanged,
          navbarBrandVariantColorChanged,
          footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

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
        console.log(response.data)
        dispatch(nameChanged(response.data.shop.name))
        dispatch(phoneNumberChanged(response.data.shop.phone_number))
        dispatch(description1Changed(response.data.shop.description1))
        dispatch(description2Changed(response.data.shop.description2))
        dispatch(description3Changed(response.data.shop.description3))
        dispatch(description4Changed(response.data.shop.description4))
        dispatch(description5Changed(response.data.shop.description5))
        dispatch(description6Changed(response.data.shop.description6))
        dispatch(postalCodeChanged(response.data.shop.postal_code))
        dispatch(stateChanged(response.data.shop.state))
        dispatch(cityChanged(response.data.shop.city))
        dispatch(townChanged(response.data.shop.town))
        dispatch(line1Changed(response.data.shop.line1))
        dispatch(line2Changed(response.data.shop.line2))
        dispatch(accessInfoChanged(response.data.shop.access_info))
        dispatch(parkingLotGuidanceChanged(response.data.shop.parking_lot_guidance))
        dispatch(businessHoursTextChanged(response.data.shop.business_hours_text))
        dispatch(remarksChanged(response.data.shop.remarks))
        dispatch(shopImage1ImagePublicUrlChanged(response.data.shop.shop_image1_public_url))
        dispatch(shopImage2ImagePublicUrlChanged(response.data.shop.shop_image2_public_url))
        dispatch(shopImage3ImagePublicUrlChanged(response.data.shop.shop_image3_public_url))
        dispatch(shopImage4ImagePublicUrlChanged(response.data.shop.shop_image4_public_url))
        dispatch(shopImage5ImagePublicUrlChanged(response.data.shop.shop_image5_public_url))
        dispatch(shopImage6ImagePublicUrlChanged(response.data.shop.shop_image6_public_url))
        dispatch(reserveFrameInfoChanged(response.data.shop.reserve_frames_info))
        dispatch(monthlyPatmentPlanInfoChanged(response.data.shop.monthly_payment_plans_info))
        dispatch(ticketMasterInfoChanged(response.data.shop.ticket_masters_info))
        dispatch(productInfoChanged(response.data.shop.products_info))
        dispatch(webpagesChanged(response.data.webpages))
        // ヘッダ、フッタ
        dispatch(navbarBrandTextChanged(response.data.shared_component.navbar_brand_text))
        dispatch(navbarBrandTypeChanged(response.data.shared_component.navbar_brand_type))
        dispatch(navbarBrandImageChanged(response.data.shared_component.navbar_brand_image_s3_object_public_url))
        dispatch(navbarBrandImageWidthChanged(response.data.shared_component.nabvar_brand_image_width))
        dispatch(navbarBrandImageHeightChanged(response.data.shared_component.nabvar_brand_image_height))
        dispatch(navbarBrandBackgroundColorChanged(response.data.shared_component.navbar_brand_background_color))
        dispatch(navbarBrandVariantColorChanged(response.data.shared_component.navbar_brand_variant_color))
        dispatch(footerCopyRightTextChanged(response.data.shared_component.footer_copyright_text))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchShop()
  }, [dispatch, router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <MerchantCustomLayout>
      <ShopPageTemplate></ShopPageTemplate>
    </MerchantCustomLayout>
  )
}

export default Index
