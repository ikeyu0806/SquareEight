import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, ListGroup, Table, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { ResourceParam } from 'interfaces/ResourceParam'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import Unauthorized from 'components/templates/Unauthorized'
import CreateResourceLimitAlert from 'components/atoms/CreateResourceLimitAlert'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [resources, setResources] = useState<ResourceParam[]>([])
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)
  const allowReadResource = useSelector((state: RootState) => state.merchantUserPermission.allowReadResource)
  const allowCreateResource = useSelector((state: RootState) => state.merchantUserPermission.allowCreateResource)
  const allowUpdateResource = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateResource)

  useEffect(() => {
    const fetchResources = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/resources`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        setResources(response.data.resources)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchResources()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <>
      <MerchantUserAdminLayout>
        <CreateResourceLimitAlert />
        <br />
        {allowReadResource === 'Allow' &&
        <Container>
          <h4>リソース一覧</h4>
          {resources.length > 0 && <Table bordered>
            <thead>
              <tr>
                <th>リソース名</th>
                <th>同時予約受付数</th>
                <th>リソース種別</th>
                <th>編集</th>
              </tr>
            </thead>
            <tbody>
            {resources.map((r, i) => {
                return (
                  <tr key={i}>
                    <td>{r.name}</td>
                    <td>{r.quantity}</td>
                    <td>{r.resource_type_text}</td>
                    <td className='text-center'>
                      {allowUpdateResource === 'Allow' && <td>
                        <a className='btn btn-primary'
                          href={`/admin/resource/${r.public_id}/edit`}>編集</a>
                      </td>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>}
          {resources.length === 0 &&
          <div className='text-center font-size-20'>リソースが登録されていません</div>}
        </Container>}
        {allowCreateResource === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
