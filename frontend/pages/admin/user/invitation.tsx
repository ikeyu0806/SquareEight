import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Table, Card } from 'react-bootstrap'

const Invitation: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <Card>
              <Card.Header>デフォルト権限一覧。プレミアムプランで機能ごとの権限変更ができます</Card.Header>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th></th>
                      <th className='text-center'>
                        ルートユーザ<br/>※初回登録時のユーザ
                      </th>
                      <th className='text-center'>管理者</th>
                      <th className='text-center'>一般ユーザ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='text-center'>ユーザの追加</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>ユーザの削除</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>ユーザの権限設定</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>予約の閲覧</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                    </tr>
                    <tr>
                      <td className='text-center'>予約の登録</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>回数券の閲覧</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>回数券の登録</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>月額課金プランの閲覧</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>月額課金プランの登録</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>リソースの閲覧</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>リソースの登録</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>商品の登録</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>顧客情報の閲覧</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>顧客の新規登録</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>メッセージテンプレートの閲覧</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>メッセージテンプレートの新規登録</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>Webページの作成</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>Webページの削除</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>Webページの閲覧</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>アンケートの作成</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>アンケート回答の閲覧</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>売り上げの閲覧</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                    </tr>
                    <tr>
                      <td className='text-center'>決済リクエストの作成</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>お支払い履歴の閲覧</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>お支払いクレジットカードの登録</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>事業情報・銀行口座の登録</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>SquareEightのプラン変更</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                    </tr>
                    <tr>
                      <td className='text-center'>サービス退会</td>
                      <td className='text-center'>○</td>
                      <td className='text-center'>×</td>
                      <td className='text-center'>×</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Invitation
