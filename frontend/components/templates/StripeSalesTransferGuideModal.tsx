import { Modal, Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showStripeSalesTransferGuideModalChanged } from 'redux/accountSlice'

const StripeSalesTransferGuideModal = () => {
  const dispatch = useDispatch()
  const showStripeSalesTransferGuideModal =  useSelector((state: RootState) => state.account.showStripeSalesTransferGuideModal)

  return (
    <Modal show={showStripeSalesTransferGuideModal}>
      <Modal.Header>売り上げの入金タイミングについて</Modal.Header>
      <Modal.Body>
        <div>売上の入金日は毎週金曜日です。</div>
        <div className='mt20'>4営業日前の月曜日から前週の火曜日までの決済が毎週金曜日に売上振込先口座に入金されます。</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(showStripeSalesTransferGuideModalChanged(false))}>閉じる</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default StripeSalesTransferGuideModal
