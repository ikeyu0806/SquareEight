import type { NextPage } from 'next'
import Spinner from 'react-bootstrap/Spinner'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'

const Callback: NextPage = () => {
  return (
    <WithoutSessionLayout>
      <div className='text-center mt50 mb50'>
        <Spinner animation='border' role='status'>
        </Spinner>
      </div>
    </WithoutSessionLayout>
  )
}

export default Callback
