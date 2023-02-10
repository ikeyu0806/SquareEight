import React, { useEffect, useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { QuestionnaireMasterParam } from 'interfaces/QuestionnaireMasterParam'
import { useCookies } from 'react-cookie'
import { Container, Row, Col, Card, ListGroup, Table } from 'react-bootstrap'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'

const Index = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [questionnaireMasters, setQuestionnaireMasters] = useState<QuestionnaireMasterParam[]>()
  const allowReadQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowReadQuestionnaireMaster)
  const allowCreateQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowCreateQuestionnaireMaster)
  const allowUpdateQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateQuestionnaireMaster)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      setQuestionnaireMasters(response.data.questionnaire_masters)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowReadQuestionnaireMaster === 'Allow' &&
      questionnaireMasters && questionnaireMasters.length > 0 &&
      <Container>
        {allowCreateQuestionnaireMaster &&
        <a className='btn btn-primary' href='/admin/questionnaire/master/new'>新規登録</a>}
        <h4 className='mt20 mb20'>アンケートマスタ</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>アンケートマスタ名</th>
              <th>公開ステータス</th>
              <th>プレビュー</th>
              <th>編集</th>
              <th>回答一覧</th>
            </tr>
          </thead>
          <tbody>
          {questionnaireMasters && questionnaireMasters.map((questionare, i) => {
          return (
            <tr key={i}>
              <td>{questionare.title}</td>
              <td>
                <PublishStatusBadge publishStatus={questionare.publish_status} />
              </td>
              <td className='text-center'>
                <a className='btn btn-primary'
                   target='_blank'
                   rel='noreferrer'
                   href={`/questionnaire/${questionare.public_id}`}>プレビュー</a>
              </td>
              <td className='text-center'>
                {allowUpdateQuestionnaireMaster === 'Allow' &&
                  <a className='btn btn-primary ml30'
                     href={`/admin/questionnaire/master/${questionare.public_id}/edit`}>編集</a>}
              </td>
              <td className='text-center'>
                <a  className='btn btn-primary ml30'
                    href={`/admin/questionnaire/master/${questionare.public_id}/answer`}>回答一覧</a>
              </td>
            </tr>
            )
          })}
          </tbody>
        </Table>
      </Container>}
      {questionnaireMasters && questionnaireMasters.length === 0 &&
        <Container>
          {allowCreateQuestionnaireMaster &&
            <a className='btn btn-primary' href='/admin/questionnaire/master/new'>新規登録</a>}
          <div className='text-center font-size-20'>アンケートマスタが登録されていません。</div>
        </Container>
      }
      {allowReadQuestionnaireMaster === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Index
