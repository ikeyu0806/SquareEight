import React from 'react'
import { Modal, Card, Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { showPermissionGuideModalChanged } from 'redux/merchantUserPermissionSlice'
import { RootState } from 'redux/store'

const MerchantUserPermissionGuideModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showPermissionGuideModal = useSelector((state: RootState) => state.merchantUserPermission.showPermissionGuideModal)

  return (
    <>
      <Modal show={showPermissionGuideModal} size='lg'>
        <Modal.Header>
          <Button
            onClick={() => dispatch(showPermissionGuideModalChanged(false))}
            variant='secondary'>
            閉じる
          </Button>
        </Modal.Header>
        <Modal.Body>
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
                    <td className='text-center'>ユーザの登録・更新・削除</td>
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
                    <td className='text-center'>予約メニューの閲覧</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                  </tr>
                  <tr>
                    <td className='text-center'>予約メニューの登録・更新・削除</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>予約の閲覧</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                  </tr>
                  <tr>
                    <td className='text-center'>予約の登録・キャンセル</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>回数券の閲覧</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                  </tr>
                  <tr>
                    <td className='text-center'>回数券の登録・更新・削除</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>月額課金プランの閲覧</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                  </tr>
                  <tr>
                    <td className='text-center'>月額課金プランの登録・更新・削除</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>リソースの閲覧</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                  </tr>
                  <tr>
                    <td className='text-center'>リソースの登録・更新・削除</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>物販商品の閲覧</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                  </tr>
                  <tr>
                    <td className='text-center'>物販商品の登録・更新・削除</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>物販商品の注文管理</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                  </tr>
                  <tr>
                    <td className='text-center'>配送日時設定</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>顧客情報の閲覧</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                  </tr>
                  <tr>
                    <td className='text-center'>顧客の登録・更新・削除</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>顧客グループの登録・更新・削除</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>顧客グループの閲覧</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                  </tr>
                  <tr>
                    <td className='text-center'>メッセージテンプレートの閲覧</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                  </tr>
                  <tr>
                    <td className='text-center'>メッセージテンプレートの登録・更新・削除</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>Webページの閲覧</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                  </tr>
                  <tr>
                    <td className='text-center'>Webページの登録・更新・削除</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>アンケートの登録・更新・削除</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>アンケート回答の閲覧</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
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
                    <td className='text-center'>○</td>
                  </tr>
                  <tr>
                    <td className='text-center'>お支払いクレジットカードの登録・更新・削除</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>事業情報・銀行口座の登録・更新・削除</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
                  </tr>
                  <tr>
                    <td className='text-center'>SquareEightのプラン変更</td>
                    <td className='text-center'>○</td>
                    <td className='text-center'>×</td>
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
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MerchantUserPermissionGuideModal
