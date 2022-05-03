import type { NextPage } from 'next'
import ServiceTemplate from '../../components/templates/ServiceTemplate'
import { Container,
         Navbar,
         Button } from 'react-bootstrap'

const Service: NextPage = () => {
  return (
    <>
      <Navbar collapseOnSelect expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>SmartLesson</Navbar.Brand>
        </Container>
      </Navbar>
      <div className='text-center mt50 mb50'>
        <h2>作成するサービスを選択してください</h2>
      </div>
      <ServiceTemplate/>
      <div className='text-center mt30 mb30'>
        <Button variant='primary' size='lg'>次へ</Button>
      </div>
    </>
  )
}

export default Service
