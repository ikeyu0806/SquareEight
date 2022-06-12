import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import React, { useEffect, useState } from 'react'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { WebsiteParam } from '../../../interfaces/WebsiteParam'

const Dashboard: NextPage = () => {
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()
  const [websites, setWebsites] = useState<WebsiteParam[]>([])

  useEffect(() => {
    const fetchHomepages = async () => {
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
        <Table>
          <thead>
            <tr>
              <th>タグ</th>
              <th>公開設定</th>
              <th>作成日時</th>
              <th></th>
            </tr>
          </thead>
          {websites.map((website, i) => {
            return (
                <tbody key={i}>
                  <tr>
                    <td>{website.tag}</td>
                    <td></td>
                    <td>{website.display_created_at}</td>
                    <td><Button>ページ一覧</Button></td>
                  </tr>
                </tbody>
            )
          })}
        </Table>
      </Container>
      <br/>
      <br/>
      <br/>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Dashboard
