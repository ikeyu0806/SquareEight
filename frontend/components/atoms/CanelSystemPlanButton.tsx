import axios from 'axios'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const CanelSystemPlanButton = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const cancelSystemPlan = () => {
    swalWithBootstrapButtons.fire({
      title: '解約します',
      html: `プランを解約します。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '解約する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/accounts/cancel_plan`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '解約しました',
            icon: 'info'
          }).then((result) => {
            location.reload()
          })
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '解約失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <a className='btn btn-danger' onClick={() => cancelSystemPlan()}>解約する</a>
  )
}

export default CanelSystemPlanButton
