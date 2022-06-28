import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { StripeAccountParam } from 'interfaces/StripeAccountParam'

const EditBankAccounts: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()

  const [stripeAccount, setStripeAccount] = useState<StripeAccountParam>()
  const [selectedExternalAccountId, setSelectedExternalAccountId] = useState('')

  useEffect(() => {
    const fetchStripeConnectedAccount = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/accounts/stripe_connected_account`, {
          headers: { 
            'Session-Id': cookies._smartlesson_session
          },
        }
      )
      .then(function (response) {
        const stripeAccountResponse: StripeAccountParam = response.data.stripe_account
        console.log(response.data)
        setStripeAccount(stripeAccountResponse)
        setSelectedExternalAccountId(response.data.selected_external_account_id)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchStripeConnectedAccount()
  }, [router.query.id, cookies._smartlesson_session, dispatch])

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <Container>
        <Card className='mt20'>
          <Card.Header>売上振込先口座編集</Card.Header>
          <Card.Body>
            {stripeAccount?.external_accounts?.data.map((account_data, i) => {
              return (
                <span key={i}>
                  <Card.Title>銀行名</Card.Title>
                  <Card.Text>{account_data.bank_name}</Card.Text>
                  <Card.Title>口座番号</Card.Title>
                  <Card.Text>{"********"}{account_data.last4}</Card.Text>
                  {selectedExternalAccountId === account_data.id 
                  ? <><Button variant='outline-info' size='sm'>振込先口座に設定されています</Button></>
                  : <><Button size='sm'>振込先口座に設定する</Button></>}
                  <><Button variant='danger' size='sm' className='ml10'>登録解除</Button></>
                  <hr />
                </span>
              )
            })}           
            <br/>
            <br/>
            <a href='/admin/sales_transfer/register_bank_account' className='btn btn-primary'>新規口座登録</a>
            <a href='/admin/sales_transfer/register_bank_account' className='btn btn-primary ml10'>口座編集</a>
          </Card.Body>
        </Card>
      </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default EditBankAccounts
