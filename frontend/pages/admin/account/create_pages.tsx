import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, ListGroup, Row, Col, Table } from 'react-bootstrap'
import axios from 'axios'
import { PageLinksParam } from 'interfaces/PageLinksParam'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'

const CreatePages: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [pageLinks, setPageLinks] = useState<PageLinksParam[]>([])

  useEffect(() => {
    const fetchPageLinks = () => {
      axios.get(`${process.env.BACKEND_URL}/api/internal/accounts/page_links`,
      {
        headers: {
          'Session-Id': cookies._square_eight_merchant_session
        }
      }).then((response) => {
        console.log(response.data)
        setPageLinks(response.data.page_links)
      }).catch((e) => {
        console.log(e)
      })
    }
    fetchPageLinks()
  }, [cookies._square_eight_merchant_session])

  const copyLinkToClipboard = (url: string) => {
    navigator.clipboard.writeText(`${process.env.FRONTEND_URL}${url}`)
    .then(() => {
      swalWithBootstrapButtons.fire({
        title: 'コピーしました',
        icon: 'info'
      })
    },(err) => {
      swalWithBootstrapButtons.fire({
        title: 'コピー失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th>ページ名</th>
              <th>ページ種別</th>
              <th>公開ステータス</th>
              <th>プレビュー</th>
              <th>コピー</th>
            </tr>
          </thead>
          <tbody>
            {pageLinks.map((link, i) => {
              return (
                <tr key={i}>
                  <td>{link.text}</td>
                  <td>{link.label}</td>
                  <td><PublishStatusBadge publishStatus={link.publish_status} /></td>
                  <td>
                    <a className='btn btn-primary btn-sm'
                       target='_blank'
                       rel='noreferrer'
                       href={link.value}>プレビュー</a>
                  </td>
                  <td>
                  <a className='btn btn-primary ml10 btn-sm'
                     onClick={() => copyLinkToClipboard(link.value)}>URLをコピー</a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default CreatePages
