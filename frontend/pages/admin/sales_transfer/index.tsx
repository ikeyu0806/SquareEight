import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'
import { StripeAccountParam } from 'interfaces/StripeAccountParam'
import { StripePersonParam } from 'interfaces/StripePersonParam'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()

  const [stripeAccount, setStripeAccount] = useState<StripeAccountParam>()
  const [stripeRepresentativePerson, setStripeRepresentativePerson] = useState<StripePersonParam>()
  const [selectedExternalAccountId, setSelectedExternalAccountId] = useState('')

  useEffect(() => {
    const fetchStripeConnectedAccount = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/accounts/stripe_connected_account`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
          },
        }
      )
      .then(function (response) {
        const stripeAccountResponse: StripeAccountParam = response.data.stripe_account
        console.log(response.data)
        setStripeAccount(stripeAccountResponse)
        setSelectedExternalAccountId(response.data.selected_external_account_id)
        setStripeRepresentativePerson(response.data.representative_person)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchStripeConnectedAccount()
  }, [router.query.id, cookies._gybuilder_merchant_session, dispatch])

  const requirementsContents = () => {
    let result = [] as string[]
    stripeAccount?.requirements.currently_due.map(due => {
      result.push('銀行口座の登録')
    })
    return result.join(' ')
  }

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          {stripeAccount?.requirements.currently_due?.length !== 0 && <Alert variant='warning'>{requirementsContents()}が不足しています</Alert>}
          <Row>
            <Col>
              <Card className='mt20'>
                <Card.Header>事業情報</Card.Header>
                <Card.Body>
                  
                  {!stripeAccount?.charges_enabled &&
                    <>
                      <div className='mb10'>事業情報の登録が完了していません</div>
                    </>
                  }
                    {stripeAccount?.business_type == 'individual'
                      ?
                        <>
                          <Card.Title>事業形態</Card.Title>
                          <Card.Text>個人事業主（副業も含む）</Card.Text>
                          <Card.Title>事業主様の姓（漢字）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.last_name}</Card.Text>
                          <Card.Title>事業主様の姓（カナ）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.last_name_kana}</Card.Text>
                          <Card.Title>事業主様のお名前（漢字）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.first_name}</Card.Text>
                          <Card.Title>事業主様のお名前（カナ）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.first_name_kana}</Card.Text>
                          <Card.Title>事業責任者の生年月日</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.dob.year}/{stripeAccount?.legal_entity?.dob.month}/{stripeAccount?.legal_entity?.dob.day}</Card.Text>
                          <Card.Title>事業責任者の姓別</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.gender === 'male' ? '男' : '女'}</Card.Text>
                          <Card.Title>事業責任者の電話番号</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_phone_number}</Card.Text>
                          <Card.Title>事業責任者のメールアドレス</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_email}</Card.Text>
                          <Card.Title>事業のウェブサイト</Card.Title>
                          <Card.Text>{stripeAccount?.business_url}</Card.Text>
                          <Card.Title>商品、サービス内容の詳細</Card.Title>
                          <Card.Text>{stripeAccount?.product_description}</Card.Text>
                          <Card.Title>郵便番号</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_address_kanji.postal_code}</Card.Text>
                          <Card.Title>都道府県（漢字）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_address_kanji.state}</Card.Text>
                          <Card.Title>都道府県（カナ）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_address_kana.state}</Card.Text>
                          <Card.Title>区市町村（漢字）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_address_kanji.town}</Card.Text>
                          <Card.Title>区市町村（カナ）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_address_kana.town}</Card.Text>
                          <Card.Title>町名（丁目まで、漢字）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_address_kanji.city}</Card.Text>
                          <Card.Title>町名（丁目まで、カナ）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_address_kana.city}</Card.Text>
                          <Card.Title>番地、号（漢字）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_address_kanji.line1}</Card.Text>
                          <Card.Title>番地、号（カナ）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_address_kana.line1}</Card.Text>
                          <Card.Title>建物・部屋番号・その他 （漢字）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_address_kanji.line2}</Card.Text>
                          <Card.Title>建物・部屋番号・その他 （カナ）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_address_kanji.line2}</Card.Text>
                        </>
                      :
                        <>
                          <Card.Title>事業形態</Card.Title>
                          <Card.Text>法人（株式会社/合同会社/NPOなど）</Card.Text>
                          <Card.Title>事業のウェブサイト</Card.Title>
                          <Card.Text>{stripeAccount?.business_profile?.url}</Card.Text>
                          <Card.Title>商品、サービス内容の詳細</Card.Title>
                          <Card.Text>{stripeAccount?.business_profile?.product_description}</Card.Text>
                          <Card.Title>郵便番号</Card.Title>
                          <Card.Text>{stripeAccount?.company?.address_kanji?.postal_code}</Card.Text>
                          <Card.Title>都道府県（漢字）</Card.Title>
                          <Card.Text>{stripeAccount?.company?.address_kanji.state}</Card.Text>
                          <Card.Title>都道府県（カナ）</Card.Title>
                          <Card.Text>{stripeAccount?.company?.address_kana.state}</Card.Text>
                          <Card.Title>区市町村（漢字）</Card.Title>
                          <Card.Text>{stripeAccount?.company?.address_kanji.town}</Card.Text>
                          <Card.Title>区市町村（カナ）</Card.Title>
                          <Card.Text>{stripeAccount?.company?.address_kana.town}</Card.Text>
                          <Card.Title>町名（丁目まで、漢字）</Card.Title>
                          <Card.Text>{stripeAccount?.company?.address_kanji.city}</Card.Text>
                          <Card.Title>町名（丁目まで、カナ）</Card.Title>
                          <Card.Text>{stripeAccount?.company?.address_kana.city}</Card.Text>
                          <Card.Title>番地、号（漢字）</Card.Title>
                          <Card.Text>{stripeAccount?.company?.address_kanji.line1}</Card.Text>
                          <Card.Title>番地、号（カナ）</Card.Title>
                          <Card.Text>{stripeAccount?.company?.address_kana.line1}</Card.Text>
                          <Card.Title>建物・部屋番号・その他 （漢字）</Card.Title>
                          <Card.Text>{stripeAccount?.legal_entity?.personal_address_kanji.line2}</Card.Text>
                          <Card.Title>建物・部屋番号・その他 （カナ）</Card.Title>
                          <Card.Text>{stripeAccount?.company?.address_kanji.line2}</Card.Text>
                          <Card.Title>代表者の姓（漢字）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.last_name_kanji}</Card.Text>
                          <Card.Title>代表者の姓（カナ）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.last_name_kana}</Card.Text>
                          <Card.Title>代表者のお名前（漢字）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.first_name_kanji}</Card.Text>
                          <Card.Title>代表者のお名前（カナ）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.first_name_kana}</Card.Text>
                          <Card.Title>事業責任者の生年月日</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.dob.year}/{stripeRepresentativePerson?.dob.month}/{stripeRepresentativePerson?.dob.day}</Card.Text>
                          <Card.Title>代表者の姓別</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.gender === 'male' ? '男' : '女'}</Card.Text>
                          <Card.Title>代表者の電話番号</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.phone}</Card.Text>
                          <Card.Title>代表者のメールアドレス</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.email}</Card.Text>
                          <Card.Title>代表者の郵便番号</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.address_kanji?.postal_code}</Card.Text>
                          <Card.Title>代表者の都道府県（漢字）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.address_kanji?.state}</Card.Text>
                          <Card.Title>代表者の都道府県（カナ）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.address_kana?.state}</Card.Text>
                          <Card.Title>代表者の区市町村（漢字）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.address_kanji?.town}</Card.Text>
                          <Card.Title>代表者の区市町村（カナ）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.address_kana?.town}</Card.Text>
                          <Card.Title>代表者の町名（丁目まで、漢字）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.address_kanji?.city}</Card.Text>
                          <Card.Title>代表者の町名（丁目まで、カナ）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.address_kana?.city}</Card.Text>
                          <Card.Title>代表者の番地、号（漢字）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.address_kanji?.line1}</Card.Text>
                          <Card.Title>代表者の番地、号（カナ）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.address_kana?.line1}</Card.Text>
                          <Card.Title>代表者の建物・部屋番号・その他 （漢字）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.address_kanji?.line2}</Card.Text>
                          <Card.Title>代表者の建物・部屋番号・その他 （カナ）</Card.Title>
                          <Card.Text>{stripeRepresentativePerson?.address_kana?.line2}</Card.Text>
                        </>}
                  <a href='/admin/sales_transfer/register_business_info' className='btn btn-primary'>事業情報登録</a>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className='mt20'>
                <Card.Header>売上振込先口座情報</Card.Header>
                <Card.Body>
                  {stripeAccount?.external_accounts && stripeAccount?.external_accounts?.data.map((account_data, i) => {
                    return (
                      <span key={i}>
                        <Card.Title>銀行名</Card.Title>
                        <Card.Text>{account_data.bank_name}</Card.Text>
                        <Card.Title>口座番号</Card.Title>
                        <Card.Text>{"********"}{account_data.last4}</Card.Text>
                        {selectedExternalAccountId === account_data.id && <><Button variant='outline-info' size='sm'>振込先口座に設定されています</Button></>}
                        <hr />
                      </span>
                    )
                  })}
                  {!stripeAccount?.external_accounts &&
                    <>
                      <div>口座が登録されていません。<br/>事業所情報入力後に口座を登録してください</div>
                    </>
                  }
                  {stripeAccount?.external_accounts && <a href='/admin/sales_transfer/register_bank_account' className='btn btn-primary mt10'>新規口座登録</a>}
                  {stripeAccount?.external_accounts && <a href='/admin/sales_transfer/edit_bank_accounts' className='btn btn-primary ml10 mt10'>口座編集</a>}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
