import { NextPage } from 'next'
import { useEffect } from 'react'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import MerchantCustomNavbar from 'components/molecules/MerchantCustomNavbar'
import MerchantCustomFooter from 'components/molecules/MerchantCustomFooter'
import { Container, Row, Col, Button } from 'react-bootstrap'
import SharedComponentFooterForm from 'components/organisms/SharedComponentFooterForm'
import SharedComponentHeaderForm from 'components/organisms/SharedComponentHeaderForm'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import axios from 'axios'
import Unauthorized from 'components/templates/Unauthorized'
import { navbarBrandTextChanged,
         navbarBrandTypeChanged,
         navbarBrandImageChanged,
         navbarBrandImagePublicUrlChanged,
         navbarBrandImageWidthChanged,
         navbarBrandImageHeightChanged,
         navbarBrandBackgroundColorChanged,
         navbarBrandVariantColorChanged,
         footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const navbarBrandType =  useSelector((state: RootState) => state.sharedComponent.navbarBrandType)
  const navbarBrandText =  useSelector((state: RootState) => state.sharedComponent.navbarBrandText)
  const navbarBrandImage =  useSelector((state: RootState) => state.sharedComponent.navbarBrandImage)
  const navbarBrandImageWidth =  useSelector((state: RootState) => state.sharedComponent.navbarBrandImageWidth)
  const navbarBrandImageHeight =  useSelector((state: RootState) => state.sharedComponent.navbarBrandImageHeight)
  const navbarBrandBackgroundColor =  useSelector((state: RootState) => state.sharedComponent.navbarBrandBackgroundColor)
  const navbarBrandVariantColor =  useSelector((state: RootState) => state.sharedComponent.navbarBrandVariantColor)
  const isUpdateNavbarBrandImage =  useSelector((state: RootState) => state.sharedComponent.isUpdateNavbarBrandImage)
  const footerCopyRightText =  useSelector((state: RootState) => state.sharedComponent.footerCopyRightText)
  const allowUpdateSharedComponent = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateSharedComponent)

  useEffect(() => {
    const fetchSharedComponent = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/shared_components`, {
          headers: {
            'Session-Id': cookies._square_eight_merchant_session
          }
        }
      )
      .then(function (response) {
        dispatch((navbarBrandTextChanged(response.data.shared_component.navbar_brand_text)))
        dispatch((navbarBrandTypeChanged(response.data.shared_component.navbar_brand_type)))
        dispatch((navbarBrandImageChanged(response.data.shared_component.navbar_brand_image_s3_object_public_url)))
        dispatch((navbarBrandImagePublicUrlChanged(response.data.shared_component.navbar_image_account_s3_image_public_url)))
        dispatch((navbarBrandImageWidthChanged(response.data.shared_component.nabvar_brand_image_width)))
        dispatch((navbarBrandImageHeightChanged(response.data.shared_component.nabvar_brand_image_height)))
        dispatch((navbarBrandBackgroundColorChanged(response.data.shared_component.navbar_brand_background_color)))
        dispatch((navbarBrandVariantColorChanged(response.data.shared_component.navbar_brand_variant_color)))
        dispatch((footerCopyRightTextChanged(response.data.shared_component.footer_copyright_text)))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchSharedComponent()
  }, [cookies._square_eight_merchant_session, dispatch])

  const onSubmit = () => {
    const params = new FormData()
    let shared_component_param = JSON.stringify({
      navbar_brand_text: navbarBrandText,
      navbar_brand_type: navbarBrandType,
      nabvar_brand_image_width: navbarBrandImageWidth,
      nabvar_brand_image_height: navbarBrandImageHeight,
      navbar_brand_background_color: navbarBrandBackgroundColor,
      navbar_brand_variant_color: navbarBrandVariantColor,
      footer_copyright_text: footerCopyRightText,
      is_update_navbar_brand_image: isUpdateNavbarBrandImage
    })
    params.append('shared_component', shared_component_param)
    params.append('navbar_brand_image', navbarBrandImage as Blob)

    axios.post(`${process.env.BACKEND_URL}/api/internal/shared_components/register`,
    params,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '登録しました',
        icon: 'info'
      })
      location.reload()
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '送信失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowUpdateSharedComponent === 'Allow' && <Container className='mb30'>
        <h3 className='mb30'>ページ共通部分編集</h3>
        <div>ページ共通のヘッダ、フッタを設定します。</div>
        <div className='mb30'>ここで設定した内容はSquareEightで作成した店舗ページ、Webページ、商品購入ページ、予約ページ、アンケートページに反映されます</div>
        <hr/>
        
        <SharedComponentHeaderForm></SharedComponentHeaderForm>
        <hr/>
        <SharedComponentFooterForm></SharedComponentFooterForm>
        <hr />
        <Button onClick={() => onSubmit()}>編集を終えて保存する</Button>
        <hr />
        <h3>プレビュー</h3>
        <hr />
        <MerchantCustomNavbar></MerchantCustomNavbar>
        <div>
          <Container >
          &nbsp;
            <h3 className='mb30'>サンプル</h3>
            <Row>
              <Col>
                <div>
                  これはサンプルです。これはサンプルです。これはサンプルです。これはサンプルです。
                  これはサンプルです。これはサンプルです。これはサンプルです。これはサンプルです。
                  これはサンプルです。これはサンプルです。これはサンプルです。これはサンプルです。
                  これはサンプルです。これはサンプルです。これはサンプルです。これはサンプルです。
                </div>
              </Col>
              <Col>
                <img src='/images/classroom.jpg' alt='sample' width='100%'></img>
              </Col>
            </Row>
          </Container>
        </div>
        <MerchantCustomFooter></MerchantCustomFooter>
      </Container>}
      {allowUpdateSharedComponent === 'Forbid' && <Unauthorized></Unauthorized>}
    </MerchantUserAdminLayout>
  )
}

export default Edit
