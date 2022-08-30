import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import React, { useEffect, useState } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { WebpageParam } from 'interfaces/WebpageParam'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [webpages, setWebpages] = useState<WebpageParam[]>([])

  useEffect(() => {
    const fetchWebpages = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/webpages`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
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
  }, [router.query.id, cookies._square_eight_merchant_session, router.query.website_id])

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <a className='btn btn-primary'
             href='/admin/webpage/neew'>
            新規ページ作成
          </a>
          <a className='btn btn-primary ml10'
             href='/admin/webpage/edit_shared_component'>
            ヘッダ・フッタ編集
          </a>
          <br />
          <br />
          <Table bordered>
            <thead>
              <tr>
                <th className='text-center'>ページ名称</th>
                <th className='text-center'></th>
                <th className='text-center'></th>
              </tr>
            </thead>
            <tbody>
              {webpages.map((webpage, i) => {
                return (
                  <tr key={i}>
                    <td className='text-center'>
                      <a href={`/admin/webpage/${webpage.id}/edit`} className='btn btn-prymary'></a>
                    </td>
                    <td className='text-center'>
                      <a className='btn btn-primary' href={`/webpages/${webpage.id}`}>プレビュー</a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
