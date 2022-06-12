import type { NextPage } from 'next'
import AdminNavbar from '../../../../components/templates/AdminNavbarTemplate'
import React, { useEffect, useState } from 'react'
import RegularFooter from '../../../../components/organisms/RegularFooter'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { WebpageParam } from '../../../../interfaces/WebpageParam'

const Dashboard: NextPage = () => {
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()
  const [webpages, setWebpages] = useState<WebpageParam[]>([])

  useEffect(() => {
    const fetchWebpages = async () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/homepages/webpages?website_id=${router.query.website_id}`, {
          headers: { 
            'Session-Id': cookies._smartlesson_session
          },
        }
      )
      .then(function (response) {
        const websiteResponse: WebpageParam[] = response.data.webpages
        setWebpages(websiteResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchWebpages()
  }, [router.query.id, cookies._smartlesson_session, router.query.website_id])

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <br />
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th className='text-center'>タグ</th>
              <th className='text-center'>パス</th>
              <th className='text-center'></th>
            </tr>
          </thead>
          <tbody>
            {webpages.map((webpage, i) => {
              return (
                <tr key={i}>
                  <td className='text-center'>{webpage.tag}</td>
                  <td className='text-center'>{webpage.path}</td>
                  <td className='text-center'><Button>編集</Button></td>
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

export default Dashboard
