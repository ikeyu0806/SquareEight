import FeaturesTemplates from './FeaturesTemplates'
import { Container,
         Navbar } from 'react-bootstrap'

const SelectFeatureTemplate = (): JSX.Element => {
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

export default SelectFeatureTemplate
