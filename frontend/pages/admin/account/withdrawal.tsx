import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Button, Row, Col, Card } from 'react-bootstrap'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'

const Withdrawal: NextPage = () => {
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const isRootUser = useSelector((state: RootState) => state.currentMerchantUser.isRootUser)

  const onSubmit = () => {
    swalWithBootstrapButtons.fire({
      title: '【最終確認】退会してもよろしいですか?',
      showCancelButton: true,
      confirmButtonText: '退会する',
      cancelButtonText: 'キャンセル'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.post(`${process.env.BACKEND_URL}/api/internal/accounts/withdrawal`,
        {},
        {
          headers: {
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '退会しました。またのご利用をお待ちしております。'
          })
          router.push('/')
        }).catch(error => {
        })
      }
    })
  }

  return (
    <MerchantUserAdminLayout>
      {isRootUser && <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Card>
              <Card.Header><div>サービス退会</div></Card.Header>
              <Card.Body>
                <div className='text-center'>
                  <div>ご利用を停止されたい場合はプランをフリープランに変更し、作成したページを削除、非公開にしてアカウントを残すことをお勧めします。</div>

                  <div className='mt20 mb20'>それでも退会される場合は退会処理を実行してください。</div>
                  <Button
                    onClick={() => onSubmit()}
                    className='mt30'
                    variant='danger'>退会する</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>}
      {!isRootUser && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Withdrawal
