import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import React, { useEffect, useState } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { WebsiteParam } from 'interfaces/WebsiteParam'
import PencilSquareIcon from 'components/atoms/PencilSquareIcon'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch } from 'react-redux'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const [websites, setWebsites] = useState<WebsiteParam[]>([])

  useEffect(() => {
    const fetchHomepages = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/homepages`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
          },
        }
      )
      .then(function (response) {
        const websiteResponse: WebsiteParam[] = response.data.websites
        setWebsites(websiteResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchHomepages()
  }, [router.query.id, cookies._gybuilder_merchant_session])

  const publishWebsite = (websiteId: number) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/homepages/publish`,
    {
      homepage: {
        website_id: websiteId
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then(response => {
      location.reload()
    }).catch(error => {
    })
  }

  const unpublishWebsite = (websiteId: number) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/homepages/unpublish`,
    {
      homepage: {
        website_id: websiteId
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then(response => {
      location.reload()
    }).catch(error => {
    })
  }

  const updateTag = (websiteId: number) => {
    swalWithBootstrapButtons.fire({
      input: 'text',
      confirmButtonText: '更新する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.BACKEND_URL}/api/internal/homepages/update_tag`,
        {
          homepage: {
            website_id: websiteId,
            tag: result.value
          }
        },
        {
          headers: {
            'Session-Id': cookies._gybuilder_merchant_session
          }
        }).then(response => {
          location.reload()
        }).catch(error => {
        })
      }
    })
  }

  const deleteWebsite = (websiteId: number) => {
    swalWithBootstrapButtons.fire({
      title: '削除します',
      html: `ホームページを削除します。<br />よろしいですか？`,
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/homepages/${websiteId}`,
        {
          headers: {
            'Session-Id': cookies._gybuilder_merchant_session
          }
        }).then(response => {
          dispatch(alertChanged({message: '削除しました', show: false}))
          location.reload()
        }).catch(error => {
        })
      }
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <Table bordered>
            <thead>
              <tr>
                <th className='text-center'>サイト名</th>
                <th className='text-center'>公開設定</th>
                <th className='text-center'>ページ一覧</th>
                <th className='text-center'>プレビュー</th>
                <th className='text-center'>削除</th>
              </tr>
            </thead>
            <tbody>
              {websites.map((website, i) => {
                return (
                  <tr key={i}>
                    <td className='text-center'>
                      <span>{website.tag}</span>
                      <a onClick={() => updateTag(website.id)}>
                        <PencilSquareIcon width={20} height={20} fill={'green'}></PencilSquareIcon>
                      </a>
                    </td>
                    <td className='text-center'>
                      {website.publish_status === 'Unpublish'
                        ?
                        <>
                          <span className='color-red'>非公開&ensp;</span>
                          <Button onClick={() => publishWebsite(website.id)}>公開する</Button>
                        </>
                        :
                        <>
                          <span className='color-green'>公開&ensp;</span>
                          <Button variant='danger' onClick={() => unpublishWebsite(website.id)}>非公開にする</Button>
                        </>
                      }
                      
                    </td>
                    <td className='text-center'>
                      <Button onClick={() => router.push(`/admin/homepage/${website.id}/webpages`)}>
                        ページ一覧
                      </Button>
                    </td>
                    <td className='text-center'>
                      {website?.top_page_id ? <a href={`/webpages/${website?.top_page_id}`} className='btn btn-primary'>プレビュー</a> : <>トップページが設定されていません</>}
                    </td>
                    <td>
                    {website.publish_status === 'Unpublish'
                    ?
                      <div className='text-center'>
                        <Button variant='danger' onClick={() => deleteWebsite(website.id)}>削除</Button>
                      </div>
                    :
                      <div className='text-center'>公開中は削除できません</div>
                    }
                    </td>
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
