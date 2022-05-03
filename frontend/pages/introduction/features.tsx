import type { NextPage } from 'next'
import FeaturesTemplates from '../../components/templates/FeaturesTemplates'
import { Container,
         Navbar } from 'react-bootstrap'

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
      <FeaturesTemplates />
    </>
  )
}

export default Feature
