import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card, Button } from 'react-bootstrap'
import { StripeAccountParam } from 'interfaces/StripeAccountParam'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { RootState } from 'redux/store'
import Unauauthorized from 'components/templates/Unauauthorized'

const EditBankAccounts: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  const [stripeAccount, setStripeAccount] = useState<StripeAccountParam>()
  const [selectedExternalAccountId, setSelectedExternalAccountId] = useState('')
  const allowUpdateStripeBusinessInfo = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateStripeBusinessInfo)

  useEffect(() => {
    const fetchStripeConnectedAccount = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/accounts/stripe_connected_account`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
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
  }, [router.query.public_id, cookies._square_eight_merchant_session, dispatch])

  const deleteBankAccount = (externalAccountId: string) => {
    swalWithBootstrapButtons.fire({
      title: '登録解除します',
      html: `登録解除登録します。<br />よろしいですか？`,
      confirmButtonText: '登録解除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/accounts/delete_bank_account/${externalAccountId}`,
        {
          headers: {
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          location.reload()
        }).catch(error => {
        })
      }
    })
  }

  const updateSelectedBankAccount = (externalAccountId: string) => {
    swalWithBootstrapButtons.fire({
      title: '送金先口座を変更します',
      html: `選択された口座を送金先に設定します。<br />よろしいですか？`,
      confirmButtonText: '設定する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.BACKEND_URL}/api/internal/accounts/update_selected_bank_account/`,
        {
          account: {
            external_account_id: externalAccountId
          }
        },
        {
          headers: {
            'Session-Id': cookies._square_eight_merchant_session
          },
        }).then(response => {
          location.reload()
        }).catch(error => {
        })
      }
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        {allowUpdateStripeBusinessInfo === 'Allow' && <Container>
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
                    : <><Button size='sm' onClick={() => updateSelectedBankAccount(account_data.id)}>振込先口座に設定する</Button>
                        <Button variant='danger'
                                size='sm'
                                className='ml10'
                                onClick={() => deleteBankAccount(account_data.id)}>登録解除</Button></>}
                    <hr />
                  </span>
                )
              })}
              {stripeAccount?.external_accounts?.data.length === 0 && <>口座が登録されていません</>}           
              <br/>
              <br/>
              <a href='/admin/sales_transfer/register_bank_account' className='btn btn-primary'>新規口座登録</a>
              <a href='/admin/sales_transfer/register_bank_account' className='btn btn-primary ml10'>口座編集</a>
            </Card.Body>
          </Card>
        </Container>}
        {allowUpdateStripeBusinessInfo === 'Allow' && <Unauauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default EditBankAccounts
