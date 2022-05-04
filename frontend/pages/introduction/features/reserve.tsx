import type { NextPage } from 'next'
import ReserveFeatures from '../../../components/organisms/ReserveFeatures'
import IntroductionNavbar from '../../../components/atoms/IntroductionNavbar'
import { Button } from 'react-bootstrap'

const Reserve: NextPage = () => {
  return(
    <>
      <IntroductionNavbar />
      <ReserveFeatures selectable={true} />
      <div className='text-center mb30'>
        <Button variant='primary' size='lg' href='/introduction/set_reserve_calendar'>次へ</Button>
      </div>
    </>
  )
}

export default Reserve
