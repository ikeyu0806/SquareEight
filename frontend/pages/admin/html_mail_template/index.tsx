import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Table, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { HtmlMailTemplateParam } from 'interfaces/HtmlMailTemplateParam'
import SendHtmlMessageModal from 'components/templates/SendHtmlMessageModal'
import { showSendHtmlMessageModalChanged,
         customersChanged,
         customerGroupsChanged,
         messageTemplateTypeChanged,
         selectedHtmlMailTemplateChanged,
         selectedHtmlMailTemplatePublicIdChanged } from 'redux/sendMailSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { customerPublicIdChanged } from 'redux/customerSlice'
import { publicIdChanged } from 'redux/customerGroupSlice'
import Unauthorized from 'components/templates/Unauthorized'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [htmlTemplates, setHtmlTemplates] = useState<HtmlMailTemplateParam[]>([])
  const allowReadHtmlMailTemplate = useSelector((state: RootState) => state.merchantUserPermission.allowReadHtmlMailTemplate)
  const allowUpdateHtmlMailTemplate = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateHtmlMailTemplate)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/html_mail_templates`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      setHtmlTemplates(response.data.html_mail_templates)
      dispatch(messageTemplateTypeChanged('htmlMailTemplate'))
      dispatch(customersChanged(response.data.customers))
      dispatch(customerGroupsChanged(response.data.customer_groups))
      dispatch(customerPublicIdChanged(response.data.customer[0].public_id))
      dispatch(publicIdChanged(response.data.customer_groups[0].public_id))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch])

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowReadHtmlMailTemplate === 'Allow' && <Container>
        <a href='/admin/html_mail_template/select_template_type' className='btn btn-primary'>新規作成</a>
        <h3 className='mt10'>HTMLメールテンプレート一覧</h3>
        <Table bordered>
          <thead>
            <tr>
              <th>テンプレート名</th>
              <th>メールのタイトル</th>
              {allowUpdateHtmlMailTemplate === 'Allow' && <th>編集</th>}
              <th>メール送信</th>
            </tr>
          </thead>
          <tbody>
            {htmlTemplates.map((template, i) => {
              return (
                <tr key={i}>
                  <td>{template.name}</td>
                  <td>{template.mail_title}</td>
                  {allowUpdateHtmlMailTemplate === 'Allow' && <td className='text-center'>
                    <a className='btn btn-primary' href={`/admin/html_mail_template/${template.public_id}/edit?template_type=${template.template_type}`}>編集</a>
                  </td>}
                  <td className='text-center'>
                    <Button onClick={() => {
                      dispatch(showSendHtmlMessageModalChanged(true))
                      dispatch(selectedHtmlMailTemplateChanged(template))
                      dispatch(selectedHtmlMailTemplatePublicIdChanged(template.public_id))
                    }}>送信</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>}
      {allowReadHtmlMailTemplate === 'Forbid' && <Unauthorized></Unauthorized>}
      <SendHtmlMessageModal></SendHtmlMessageModal>
    </MerchantUserAdminLayout>
  )
}

export default Index
