import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { ResourceParam } from 'interfaces/ResourceParam'
import { resourceReceptionTimeSettingText } from 'functions/resourceReceptionTimeSettingText'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [resources, setResources] = useState<ResourceParam[]>([])

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
        const resourceResponse: ResourceParam[] = response.data.resources
        setResources(resourceResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchResources()
  }, [router.query.id, cookies._square_eight_merchant_session])

  return (
    <>
      <MerchantUserAdminLayout>
        <br />
        <Container>
          <Table bordered>
            <thead>
              <tr>
                <th className='text-center'>リソース名</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {resources.map((resource, i) => {
              return (
                <tr key={i}>
                  <td className='text-center'>{resource.name}</td>
                  <td className='text-center'>{resource.quantity}</td>
                </tr>
              )
            })}
            </tbody>
          </Table>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
