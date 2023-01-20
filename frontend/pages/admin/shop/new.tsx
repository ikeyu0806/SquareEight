import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CreateShop from 'components/templates/CreateShop'
import axios from 'axios'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { RootState } from 'redux/store'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const name = useSelector((state: RootState) => state.shop.name)
  const description1 = useSelector((state: RootState) => state.shop.description1)
  const description2 = useSelector((state: RootState) => state.shop.description2)
  const remarks = useSelector((state: RootState) => state.shop.remarks)
  const postalCode = useSelector((state: RootState) => state.shop.postalCode)
  const state = useSelector((state: RootState) => state.shop.state)
  const city = useSelector((state: RootState) => state.shop.city)
  const town = useSelector((state: RootState) => state.shop.town)
  const line1 = useSelector((state: RootState) => state.shop.line1)
  const line2 = useSelector((state: RootState) => state.shop.line2)
  const pageCoverSlide1File = useSelector((state: RootState) => state.shop.pageCoverSlide1File)
  const pageCoverSlide2File = useSelector((state: RootState) => state.shop.pageCoverSlide2File)
  const pageCoverSlide3File = useSelector((state: RootState) => state.shop.pageCoverSlide3File)
  const brandImageFile = useSelector((state: RootState) => state.shop.brandImageFile)
  const shopImage1File = useSelector((state: RootState) => state.shop.shopImage1File)
  const shopImage2File = useSelector((state: RootState) => state.shop.shopImage2File)
  const shopImage3File = useSelector((state: RootState) => state.shop.shopImage3File)

  const createShop = () => {
    const params = new FormData()
    params.append('name', name)
    params.append('description1', description1)
    params.append('description2', description2)
    params.append('postal_code', postalCode)
    params.append('state', state)
    params.append('city', city)
    params.append('town', town)
    params.append('line1', line1)
    params.append('line2', line2)
    params.append('remarks', remarks)
    params.append('page_cover_slide1_file', pageCoverSlide1File as Blob)
    params.append('page_cover_slide2_file', pageCoverSlide2File as Blob)
    params.append('page_cover_slide3_file', pageCoverSlide3File as Blob)
    params.append('brand_image_file', brandImageFile as Blob)
    params.append('shop_image1_file', shopImage1File as Blob)
    params.append('shop_image2_file', shopImage2File as Blob)
    params.append('shop_image3_file', shopImage3File as Blob)
    axios.post(`${process.env.BACKEND_URL}/api/internal/shops`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Session-Id': cookies._square_eight_merchant_session
      },
    }).then(response => {
      console.log(response)
      dispatch(alertChanged({message: '保存しました', show: true}))
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <CreateShop />
              <Button
                onClick={createShop}
                className='mt20'>保存する</Button>
            </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
