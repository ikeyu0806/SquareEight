import { Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { pageContentChanged, webpagePathChanged, webpageTagChanged } from '../../redux/homepageSlice'

const HomepageIntoroductionButtons = (): JSX.Element => {
  const dispatch = useDispatch()
  const router = useRouter()
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)
  const webpagePath = useSelector((state: RootState) => state.homepage.webpagePath)
  const webpageTag = useSelector((state: RootState) => state.homepage.webpageTag)
  const [cookies] = useCookies(['_smartlesson_session'])

  const completeCreateHomepage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/homepages/complete_create_homepage`,
    {
      homepage: {
        website_id: router.query.website_id,
        page_content: pageContent,
        path: webpagePath,
        tag: webpageTag
      }
    },
    {
      headers: {
        'Session-Id': cookies._smartlesson_session
      }
    }).then(response => {
      router.push('/admin/dashboard')
    }).catch(error => {
    })
  }

  const createWebpage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/homepages/create_web_page`,
    {
      homepage: {
        page_content: pageContent,
        path: webpagePath,
        tag: webpageTag
      }
    },
    {
      headers: {
        'Session-Id': cookies._smartlesson_session
      }
    }).then(response => {
      dispatch(webpagePathChanged(''))
      dispatch(webpageTagChanged(''))
      dispatch(pageContentChanged([]))
      router.push(`/introduction/${response.data.website_id}/create_homepage`)
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
          <Button variant='primary' size='lg' onClick={createWebpage}>ページを追加</Button>
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
