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
    const fetchNotifications = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/system/accounts`,
        { headers: {
            'Session-Id': cookies._square_eight_system_admin_user_session
          }
        }
      )
      .then(function (response) {
        setAccounts(response.data.system_account_notifications)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchNotifications()
  }, [cookies._square_eight_system_admin_user_session])

  return (
    <SystemAdminLayoutTemplate>
      <Container>
        <h4>アカウント一覧</h4>
        <Table>
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
