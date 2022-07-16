import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import React, { useEffect, useState } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { WebpageParam } from 'interfaces/WebpageParam'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const [webpages, setWebpages] = useState<WebpageParam[]>([])

  useEffect(() => {
    const fetchWebpages = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/homepages/webpages?website_id=${router.query.website_id}`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
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
  }, [router.query.id, cookies._gybuilder_merchant_session, router.query.website_id])

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <Button
          onClick={() => router.push(`/admin/homepage/${router.query.website_id}/webpages/new`)}
          className='mr10'>
            新規ページ作成
          </Button>
          <Button
            onClick={() => router.push(`/admin/homepage/${router.query.website_id}/edit_shared_component`)}>
            ヘッダ・フッタ編集
          </Button>
          <br />
          <br />
          <Table bordered>
            <thead>
              <tr>
                <th className='text-center'>タグ</th>
                <th className='text-center'></th>
                <th className='text-center'></th>
              </tr>
            </thead>
            <tbody>
              {webpages.map((webpage, i) => {
                return (
                  <tr key={i}>
                    <td className='text-center'>
                      {webpage.tag} {webpage.is_top_page && <span className='badge bg-info'>トップページに設定されています</span>}
                    </td>
                    <td className='text-center'>
                      <Button onClick={() => router.push(`/admin/homepage/webpages/${webpage.id}/edit?website_id=${router.query.website_id}`)}>
                        編集
                      </Button>
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
