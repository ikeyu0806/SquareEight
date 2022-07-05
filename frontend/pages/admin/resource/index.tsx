import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import AdminNavbar from 'components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { ResourceParam } from 'interfaces/ResourceParam'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()
  const [resources, setResources] = useState<ResourceParam[]>([])

  useEffect(() => {
    const fetchResources = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/resources`, {
          headers: { 
            'Session-Id': cookies._smartlesson_session
          },
        }
      )
      .then(function (response) {
        const resourceResponse: ResourceParam[] = response.data.resources
        setResources(resourceResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchResources()
  }, [router.query.id, cookies._smartlesson_session])

  return (
    <>
      <AdminNavbar></AdminNavbar>
        <br />
        <Container>
          <Table bordered>
            <thead>
              <tr>
                <th className='text-center'>リソース名</th>
                <th className='text-center'>月額料金</th>
                <th className='text-center'>曜日別予約受付設定</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {resources.map((resource, i) => {
              return (
                <tr key={i}>
                  <td className='text-center'>{resource.name}</td>
                  <td className='text-center'>{resource.quentity}</td>
                  <td className='text-center'>{resource.reception_time_setting}</td>
                  <td>
                    <div className='text-center'>
                      <a className='btn btn-primary' href={`/admin/resource/${resource.id}/edit`}>編集</a>
                    </div>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </Table>
        </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Index
