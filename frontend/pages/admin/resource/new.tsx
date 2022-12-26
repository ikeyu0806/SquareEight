import { NextPage } from 'next'
import CreateResource from 'components/templates/CreateResource'
import { Container, Row, Col } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import ResourceLimitAlert from 'components/molecules/ResourceLimitAlert'
import Unauthorized from 'components/templates/Unauthorized'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  const name = useSelector((state: RootState) => state.resource.name)
  const quantity = useSelector((state: RootState) => state.resource.quantity)
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)
  const allowCreateResource = useSelector((state: RootState) => state.merchantUserPermission.allowCreateResource)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/resources`,
    {
      resources: {
        name: name,
        quantity: quantity
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      router.push('/admin/resource')
      dispatch(alertChanged({message: 'リソースを登録しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        {allowCreateResource === 'Allow' &&<Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              {/* TODO:お試し期間終わったら外す */}
              {/* <ResourceLimitAlert /> */}
              {/* {['Standard', 'Premium'].includes(servicePlan) && */}
                <>
                  <CreateResource></CreateResource>
                  <div className='text-center'>
                    <Button onClick={onSubmit} className='mt10'>登録する</Button>
                  </div>
                </>
              {/* } */}
            </Col>
          </Row>
        </Container>}
        {allowCreateResource === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default New
