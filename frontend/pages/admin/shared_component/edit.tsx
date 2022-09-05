import { NextPage } from 'next'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import MerchantCustomNavbar from 'components/molecules/MerchantCustomNavbar'
import SharedComponentHeaderModal from 'components/templates/SharedComponentHeaderModal'
import SharedComponentFooterModal from 'components/templates/SharedComponentFooterModal'
import { Container, Navbar, Row, Col, Button } from 'react-bootstrap'
import { showHeaderEditModalChanged,
         showFooterEditModalChanged } from 'redux/sharedComponentSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()

  return (
    <MerchantUserAdminLayout>
      <Container className='mb30'>
        <h3 className='mb30'>ページ共通部分編集</h3>
        <div>ページ共通のヘッダ、フッタ、全体の見た目を調整します。</div>
        <div className='mb30'>ここで設定した内容はSquareEightで作成したWebページ、商品購入ページ、予約ページ、アンケートページに反映されます</div>
        <hr/>
        <Button onClick={() => dispatch(showHeaderEditModalChanged(true))}>ヘッダを編集</Button>
        <Button
          onClick={() => dispatch(showFooterEditModalChanged(true))}
          className='ml20'>フッタを編集</Button>
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
        <footer className='content text-center'>
          <hr />
          <Row>
            <Col>
              <p className='footer-margin'>Copyright SquareEight {new Date().getFullYear()}</p>
            </Col>
          </Row>
        </footer>
      </Container>
      <SharedComponentHeaderModal></SharedComponentHeaderModal>
      <SharedComponentFooterModal></SharedComponentFooterModal>
    </MerchantUserAdminLayout>
  )
}

export default Edit
