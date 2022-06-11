import { Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const HomepageIntoroductionButtons = (): JSX.Element => {
  const router = useRouter()
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)
  const [cookies] = useCookies(['_smartlesson_session'])

  const completeCreateHomepage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/homepages/create_web_page`,
    {
      homepage: {
        page_content: pageContent
      }
    },
    {
      headers: {
        'Session-Id': cookies._smartlesson_session
      }
    }).then(response => {
      // router.push('/admin/dashboard')
    }).catch(error => {
    })
  }

  return (
    <>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col sm={2}>
          <Button variant='outline-primary' size='lg' onClick={() => router.back()}>戻る</Button>
        </Col>
        <Col sm={4}>
          <Button variant='primary' size='lg' onClick={completeCreateHomepage}>ホームページ制作を完了する</Button>
        </Col>
        <Col></Col>
        <Col sm={2}>
          <Button variant='primary' size='lg' href='/introduction/set_reserve_calendar'>ページを追加</Button>
        </Col>
        <Col></Col>
        <Col sm={2}>
          <Button variant='outline-primary' size='lg' href='/introduction/set_reserve_calendar'>スキップ</Button>
        </Col>
        <Col></Col>
      </Row>
    </>
  )
}

export default HomepageIntoroductionButtons
