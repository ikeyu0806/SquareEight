import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import React, { useEffect, useState } from 'react'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { WebsiteParam } from '../../../interfaces/WebsiteParam'
import PencilSquareIcon from '../../../components/atoms/PencilSquareIcon'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()
  const [websites, setWebsites] = useState<WebsiteParam[]>([])

  useEffect(() => {
    const fetchHomepages = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/homepages`, {
          headers: { 
            'Session-Id': cookies._smartlesson_session
          },
        }
      )
      .then(function (response) {
        const websiteResponse: WebsiteParam[] = response.data.websites
        setWebsites(websiteResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchHomepages()
  }, [router.query.id, cookies._smartlesson_session])

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <br />
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th className='text-center'>タグ</th>
              <th className='text-center'>公開設定</th>
              <th className='text-center'>作成日時</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {websites.map((website, i) => {
              return (
                <tr key={i}>
                  <td className='text-center'>
                    <span>{website.tag}</span>
                    <PencilSquareIcon width={20} height={20} fill={'green'}></PencilSquareIcon>
                  </td>
                  <td className='text-center'>
                    {website.publish_status === 'Unpublish'
                      ?
                      <>
                        <span className='color-red'>非公開&ensp;</span>
                        <Button>公開する</Button>
                      </>
                      :
                      <>
                        <span className='color-green'>公開&ensp;</span>
                        <Button variant="danger">非公開にする</Button>
                      </>
                    }
                    
                  </td>
                  <td className='text-center'>{website.display_created_at}</td>
                  <td className='text-center'>
                    <Button onClick={() => router.push(`/admin/homepage/${website.id}/webpages`)}>
                      ページ一覧
                    </Button>
                  </td>
                  <td className='text-center'><Button>プレビュー</Button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
      <br/>
      <br/>
      <br/>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Index
