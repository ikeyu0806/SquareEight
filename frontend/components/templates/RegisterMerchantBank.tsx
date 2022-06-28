import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'
import { accountNumberChanged,
         bankCodeChanged,
         branchCodeChanged,
         accountHolderNameChanged } from 'redux/stripeExternalAccountsSlice'

const RegisterMerchantBank = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_smartlesson_session'])

  const accountNumber = useSelector((state: RootState) => state.stripeExternalAccount.accountNumber)
  const bankCode = useSelector((state: RootState) => state.stripeExternalAccount.bankCode)
  const branchCode = useSelector((state: RootState) => state.stripeExternalAccount.branchCode)
  const accountHolderName = useSelector((state: RootState) => state.stripeExternalAccount.accountHolderName)

  const registerBankAccount = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/accounts/register_stripe_bank_account`,
    {
      account: {
        account_number: accountNumber,
        bank_code: bankCode,
        branch_code: branchCode,
        account_holder_name: accountHolderName,
      },
    },
    {
      headers: { 
        'Session-Id': cookies._smartlesson_session
      }
    }).then(response => {
      router.push('/admin/sales_transfer')
    }).catch(error => {
      dispatch(alertChanged({message: '登録失敗しました', show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <Card.Header>振込先銀行口座登録</Card.Header>
      <Card.Body>
        <Form.Label className='mt10'>口座番号</Form.Label>
        <Form.Control onChange={(e) => dispatch((accountNumberChanged(e.target.value)))}
                      value={accountNumber}></Form.Control>
        <Form.Label className='mt10'>口座名義人</Form.Label>
        <Form.Control onChange={(e) => dispatch((accountHolderNameChanged(e.target.value)))}
                      value={accountHolderName}></Form.Control>
        <Form.Label className='mt10'>銀行コード</Form.Label>
        <Form.Control onChange={(e) => dispatch((bankCodeChanged(e.target.value)))}
                      value={bankCode}></Form.Control>
        <Form.Label className='mt10'>支店コード</Form.Label>
        <Form.Control onChange={(e) => dispatch((branchCodeChanged(e.target.value)))}
                      value={branchCode}></Form.Control>
        <div className='text-center mt20'>
          <Button onClick={registerBankAccount}>登録する</Button>
        </div>
      </Card.Body>
    </>
  )
}

export default RegisterMerchantBank
