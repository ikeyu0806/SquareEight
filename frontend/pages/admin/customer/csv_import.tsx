import React, { useState } from 'react'
import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'

const CsvImport: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const [file, setFile] = useState<File>()

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(e.target.files[0])
    }
  }

  const onSubmit = () => {
    const params = new FormData()
    params.append('file', file || '')
    axios.post(`${process.env.BACKEND_URL}/api/internal/customers/csv_import`, params,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      },
    })
    .then(function (response) {
      dispatch(alertChanged({message: name + '取り込み完了しました。', show: true}))
    })
    .catch(error => {
      console.log(error)
      dispatch(alertChanged({message: '取り込みに失敗しました。', show: true, type: 'danger'}))
    })
  }


  return (
    <MerchantUserAdminLayout>
      <br />
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <h4>顧客CSVインポート</h4>
            <div className='mt20 mb20'>
              CSVファイルから顧客情報を登録することができます。
            </div>
            <Table bordered>
              <thead>
                <tr>
                  <th scope='col'>フィールド名</th>
                  <th scope='col'>フォーマット</th>
                  <th scope='col'>例</th>
                  <th scope='col'>説明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>last_name</td>
                  <td>文字列</td>
                  <td>お名前（姓）</td>
                  <td>お名前（姓）</td>
                </tr>
                <tr>
                  <td>first_name</td>
                  <td>文字列</td>
                  <td>お名前（名）</td>
                  <td>お名前（名）</td>
                </tr>
                <tr>
                  <td>last_name_kana</td>
                  <td>文字列</td>
                  <td>お名前（姓カナ）</td>
                  <td>お名前（姓カナ）</td>
                </tr>
                <tr>
                  <td>first_name_kana</td>
                  <td>文字列</td>
                  <td>お名前（名カナ）</td>
                  <td>お名前（名カナ）</td>
                </tr>
                <tr>
                  <td>email</td>
                  <td>文字列</td>
                  <td>メールアドレス</td>
                  <td>メールアドレス</td>
                </tr>
                <tr>
                  <td>phone_number</td>
                  <td>文字列</td>
                  <td>電話番号</td>
                  <td>電話番号</td>
                </tr>
                <tr>
                  <td>memo</td>
                  <td>文字列</td>
                  <td>メモ</td>
                  <td>メモ</td>
                </tr>
              </tbody>
            </Table>
            <div className='mt20'>
              <input
                className='form-control'
                type='file'
                id='formFile'
                onChange={fileUpload}
                ></input>
            </div>
            <div className='mt10'>
              <button
                className='btn btn-primary mr10'
                onClick={onSubmit}
                >取り込み</button>
              <a className='btn btn-primary' href='/csv_sample/customer_import.csv'>CSVフォーマットダウンロード</a>
            </div>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default CsvImport
