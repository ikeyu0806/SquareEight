import axios from 'axios'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const CanelSystemPlanButton = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const cancelSystemPlan = () => {
    axios.delete(`${process.env.BACKEND_URL}/api/internal/accounts/cancel_plan`, {
      headers: { 
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '解除しました',
        icon: 'info'
      }).then((result) => {
        location.reload()
      })
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '解除失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <a className='btn btn-danger' onClick={() => cancelSystemPlan()}>解除する</a>
  )
}

export default CanelSystemPlanButton
