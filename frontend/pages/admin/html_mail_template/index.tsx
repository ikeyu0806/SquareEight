import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Table, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { HtmlMailTemplateParam } from 'interfaces/HtmlMailTemplateParam'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [htmlTemplates, setHtmlTemplates] = useState<HtmlMailTemplateParam[]>([])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/html_mail_templates`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      setHtmlTemplates(response.data.html_mail_templates)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <Container>
        <a href='/admin/html_mail_template/select_template_type' className='btn btn-primary'>新規作成</a>
        <h3 className='mt10'>HTMLメールテンプレート一覧</h3>
        <Table bordered>
          <thead>
            <tr>
              <th>テンプレート名</th>
              <th>メールのタイトル</th>
              <th>編集</th>
              <th>送信予約</th>
            </tr>
          </thead>
          <tbody>
            {htmlTemplates.map((template, i) => {
              return (
                <tr key={i}>
                  <td>{template.name}</td>
                  <td>{template.mail_title}</td>
                  <td>
                    <a className='btn btn-primary' href={`/admin/html_mail_template/${template.public_id}/edit`}>編集</a>
                  </td>
                  <td>
                    <a className='btn btn-primary' href={`/admin/html_mail_template/${template.public_id}/edit`}>送信予約</a>
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

export default Index
