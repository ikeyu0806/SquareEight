import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showInventoryDescriptionModalChanged } from 'redux/productSlice'

const InventoryDescriptionModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showInventoryDescriptionModal = useSelector((state: RootState) => state.product.showInventoryDescriptionModal)

  return (
    <Modal show={showInventoryDescriptionModal}>
      <Modal.Header>在庫管理について</Modal.Header>
      <Modal.Body>
        <div>顧客が商品を購入すると在庫引当数が注文数分加算されます。</div>
        <div className='mt20'>注文管理画面の「発送済みに更新する」ボタンを押すと在庫引当が0になり在庫数から在庫引当数が差し引かれます。</div>
        <div className='mt20'>在庫引当数が在庫数以上になると注文を受け付けられなくなります。</div>
        <hr />
        <div className='mt20'>
          例）在庫数10のTシャツを販売する場合の操作例。
        </div>
        <div className='mt20'>
          <div>①ある顧客がTシャツを10枚注文しました。</div>
          <div className='mt10'>②10枚注文が入ったので在庫引当数が10になります。この時点でTシャツは追加注文を受け付けられなくなります。</div>
          <div className='mt10'>③商品を発注したら注文管理画面の「発送済みに更新する」ボタンを押してください。在庫引当が0になり在庫が0になります。</div>
          <div className='mt10'>④在庫が入り再度注文を受け付けられるようにするには商品一覧から「在庫数を変更する」ボタンを押して在庫数を増やしてください。</div>
          <div className='mt10'></div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(showInventoryDescriptionModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InventoryDescriptionModal
