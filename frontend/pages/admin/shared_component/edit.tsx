import { NextPage } from 'next'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import MerchantCustomNavbar from 'components/molecules/MerchantCustomNavbar'
import MerchantCustomFooter from 'components/molecules/MerchantCustomFooter'
import { Container, Row, Col, Button } from 'react-bootstrap'
import SharedComponentFooterForm from 'components/organisms/SharedComponentFooterForm'
import SharedComponentHeaderForm from 'components/organisms/SharedComponentHeaderForm'

const Edit: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container className='mb30'>
        <h3 className='mb30'>ページ共通部分編集</h3>
        <div>ページ共通のヘッダ、フッタを設定します。</div>
        <div className='mb30'>ここで設定した内容はSquareEightで作成したWebページ、商品購入ページ、予約ページ、アンケートページに反映されます</div>
        <hr/>
        
        <SharedComponentHeaderForm></SharedComponentHeaderForm>
        <hr/>
        <SharedComponentFooterForm></SharedComponentFooterForm>
        <hr />
        <Button>編集を終えて保存する</Button>
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
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Edit
