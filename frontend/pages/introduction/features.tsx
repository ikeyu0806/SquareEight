import type { NextPage } from 'next'
import FeaturesTemplates from '../../components/templates/FeaturesTemplates'
import RegularFooter from '../../components/organisms/RegularFooter'
import IntroductionNavbar from '../../components/templates/IntroductionNavbar'
import { Button } from 'react-bootstrap'

const Feature: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <div className='text-center mt50 mb50'>
        <h2>追加したい機能を選択してください</h2>
      </div>
      <FeaturesTemplates selectable={true} />
      <div className='text-center mb30'>
        <Button variant='primary' size='lg'>次へ</Button>
      </div>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Feature
