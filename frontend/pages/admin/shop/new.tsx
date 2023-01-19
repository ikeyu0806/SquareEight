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
  const pageCoverSlide1File = useSelector((state: RootState) => state.shop.pageCoverSlide1File)

  const createShop = () => {
    const params = new FormData()
    params.append('name', name)
    params.append('description1', description1)
    params.append('page_cover_slide1_file', pageCoverSlide1File as Blob)
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
