import type { NextPage } from 'next'
import FeaturesTemplates from '../../components/templates/FeaturesTemplates'
import { Container,
         Navbar,
         Button } from 'react-bootstrap'

const Feature: NextPage = () => {
  return (
    <>
      <Navbar collapseOnSelect expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>SmartLesson</Navbar.Brand>
        </Container>
      </Navbar>
      <div className='text-center mt50 mb50'>
        <h2>追加したい機能を選択してください</h2>
      </div>
      <FeaturesTemplates selectable={true} />
      <div className='text-center mb30'>
        <Button variant='primary' size='lg'>次へ</Button>
      </div>
    </>
  )
}

export default Feature
