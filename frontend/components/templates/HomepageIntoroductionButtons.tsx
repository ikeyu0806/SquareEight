import { Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { pageContentChanged, webpageTagChanged, isTopPageChanged } from '../../redux/homepageSlice'

const HomepageIntoroductionButtons = (): JSX.Element => {
  const dispatch = useDispatch()
  const router = useRouter()
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)
  const webpageTag = useSelector((state: RootState) => state.homepage.webpageTag)
  const isTopPage = useSelector((state: RootState) => state.homepage.isTopPage)
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const completeCreateHomepage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/webpages`,
    {
      webpage: {
        website_id: router.query.website_id,
        page_content: pageContent,
        tag: webpageTag
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(webpageTagChanged(''))
      dispatch(pageContentChanged([]))
      router.push('/admin/dashboard')
    }).catch(error => {
    })
  }

  const createWebpage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/webpages`,
    {
      webpage: {
        website_id: router.query.website_id,
        page_content: pageContent,
        tag: webpageTag,
        is_top_page: isTopPage
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(webpageTagChanged(''))
      dispatch(pageContentChanged([]))
      router.push(`/introduction/${response.data.website_id}/create_webpage`)
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
