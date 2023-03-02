import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import SystemAdminLayoutTemplate from 'components/templates/SystemAdminLayoutTemplate'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { AccountParam } from 'interfaces/AccountParam'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_system_admin_user_session'])
  const [accounts, setAccounts] = useState<AccountParam[]>([])

  useEffect(() => {
    const fetchAccounts = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/system/accounts`,
        { headers: {
            'Session-Id': cookies._square_eight_system_admin_user_session
          }
        }
      )
      .then(function (response) {
        console.log(response.data)
        setAccounts(response.data.accounts)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchAccounts()
  }, [cookies._square_eight_system_admin_user_session])

  return (
    <SystemAdminLayoutTemplate>
      <br />
      <Container>
        <h4>アカウント一覧</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>public_id</th>
              <th>business_name</th>
              <th>service_plan</th>
              <th>stripe_account_id</th>
              <th>stripe_subscription_id</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a, i) => {
              return (
                <tr key={i}>
                  <td>{a.public_id}</td>
                  <td>{a.business_name}</td>
                  <td>{a.service_plan}</td>
                  <td>{a.stripe_account_id}</td>
                  <td>{a.stripe_subscription_id}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </SystemAdminLayoutTemplate>
  )
}

export default Index
