import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import React, { useEffect } from 'react'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'

const Dashboard: NextPage = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <br />
      <Container>
        <Table>
          <thead>
            <tr>
              <th>タグ</th>
              <th>公開設定</th>
              <th>作成日時</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <br/>
      <br/>
      <br/>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Dashboard
