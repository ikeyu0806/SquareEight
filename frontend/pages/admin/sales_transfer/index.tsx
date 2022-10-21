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
import { ServiceStripePersonParam } from 'interfaces/ServiceStripePersonParam'
import CheckIcon from 'components/atoms/CheckIcon'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  const [stripeAccount, setStripeAccount] = useState<StripeAccountParam>()
  const [stripeRepresentativePerson, setStripeRepresentativePerson] = useState<StripePersonParam>()
  const [selectedExternalAccountId, setSelectedExternalAccountId] = useState('')
  const [stripePersons, setStripePersons] = useState<ServiceStripePersonParam[]>([])

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
        setStripeRepresentativePerson(response.data.representative_person)
        setStripePersons(response.data.stripe_persons)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchStripeConnectedAccount()
  }, [cookies._square_eight_merchant_session, dispatch])

  const requirementsContents = () => {
    let result = [] as string[]
    stripeAccount?.requirements.currently_due.map(due => {
      if (due === 'external_account') {
        result.push('銀行口座の登録')
      } else if (due.match(/person.*?address_kanji.state/)) {
        result.push('代表者の都道府県（漢字）')
      } else if (due.match(/person.*?address_kanji.city/)) {
        result.push('代表者の区市町村（漢字）')
      } else if (due.match(/person.*?address_kanji.town/)) {
        result.push('代表者の町名（丁目まで、漢字）')
      } else if (due.match(/person.*?address_kanji.line1/)) {
        result.push('代表者の番地、号（漢字）')
      } else if (due.match(/person.*?address_kanji.line2/)) {
        result.push('代表者の建物・部屋番号・その他 （漢字）')
      } else if (due.match(/person.*?address_kana.state/)) {
        result.push('代表者の都道府県（カナ）')
      } else if (due.match(/person.*?address_kana.city/)) {
        result.push('代表者の区市町村（カナ）')
      } else if (due.match(/person.*?address_kana.town/)) {
        result.push('代表者の町名（丁目まで、カナ）')
      } else if (due.match(/person.*?address_kana.line1/)) {
        result.push('代表者の番地、号（カナ）')
      } else if (due.match(/person.*?address_kana.line2/)) {
        result.push('代表者の建物・部屋番号・その他 （カナ）')
      } else if (due === 'directors_provided') {
        result.push('取締役の有無')
      } else if (due === 'directors.last_name_kanji') {
        result.push('取締役の姓（漢字）')
      } else if (due === 'directors.first_name_kanji') {
        result.push('取締役の名（漢字）')
      } else if (due === 'directors.last_name_kana') {
        result.push('取締役の姓（カナ）')
      } else if (due === 'directors.first_name_kana') {
        result.push('取締役の名（カナ）')
      } else if (due === 'company.directors_provided') {
        result.push('取締役の情報')
      } else if (due === 'directors.dob.year') {
        result.push('取締役の生年月日（年）')
      } else if (due === 'directors.dob.month') {
        result.push('取締役の生年月日（月）')
      } else if (due === 'directors.dob.day') {
        result.push('取締役の生年月日（日）')
      } else if (due.match(/verification.document/)) {
        result.push('本人確認書類')
      }
    })
    return result.join('、')
  }

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          {stripeAccount?.requirements && stripeAccount?.requirements.currently_due?.length !== 0 && <Alert variant='warning'>{requirementsContents()}が不足しています</Alert>}
          {/* {stripeAccount?.business_type == 'company'
            && <Alert variant='info'>
                <a href='/admin/sales_transfer/register_stripe_person'>代表者以外にも事業を所有する幹部, オーナー, 取締役が存在する場合こちらから登録してください</a>
              </Alert>
          } */}
          <Row>
            <Col>
              <Card className='mt20 mb20'>
                <Card.Header>
                  事業情報
                  {stripeAccount?.payouts_enabled && <span className='ml10'>有効<CheckIcon width={20} height={20} fill={'#39FA05'} /></span>}
                </Card.Header>
                <Card.Body>
                  
                  {!stripeAccount?.charges_enabled &&
                    <>
                      <div className='mb10'>事業情報の登録が完了していません</div>
                    </>
                  }
                    {stripeAccount?.business_type == 'company'
                      &&
                        <>
                        <div>{stripeAccount?.business_profile && <>事業形態</>}</div>
                        <div>{stripeAccount?.business_profile && <>法人（株式会社/合同会社/NPOなど）</>}</div>
                        <div>{stripeAccount?.business_profile?.url && <><hr />事業のウェブサイト</>}</div>
                        <div>{stripeAccount?.business_profile?.url}</div>
                        <div>{stripeAccount?.business_profile?.product_description && <><hr />商品、サービス内容の詳細</>}</div>
                        <div>{stripeAccount?.business_profile?.product_description}</div>
                        <div>{stripeAccount?.company?.address_kanji?.postal_code && <><hr />郵便番号</>}</div>
                        <div>{stripeAccount?.company?.address_kanji?.postal_code}</div>
                        <div>{stripeAccount?.company?.address_kanji.state && <><hr />住所（漢字）</>}</div>
                        <div>
                          {stripeAccount?.company?.address_kanji.state}
                          {stripeAccount?.company?.address_kanji.town}
                          {stripeAccount?.company?.address_kanji.city}
                          {stripeAccount?.company?.address_kanji.line1}
                          {stripeAccount?.company?.address_kanji.line2}
                        </div>
                        <div>{stripeAccount?.company?.address_kana.state && <><hr />住所（カナ）</>}</div>
                        <div>
                          {stripeAccount?.company?.address_kana.state}
                          {stripeAccount?.company?.address_kana.town}
                          {stripeAccount?.company?.address_kana.city}
                          {stripeAccount?.company?.address_kana.line1}
                          {stripeAccount?.company?.address_kana.line2}
                        </div>
                        <div>{stripeRepresentativePerson?.last_name_kanji && <><hr />代表者のお名前（漢字）</>}</div>
                        <div>{stripeRepresentativePerson?.last_name_kanji}{stripeRepresentativePerson?.first_name_kanji}</div>
                        <div>{stripeRepresentativePerson?.last_name_kana && <><hr />代表者のお名前（カナ）</>}</div>
                        <div>{stripeRepresentativePerson?.last_name_kana}{stripeRepresentativePerson?.first_name_kana}</div>
                        <div>{stripeRepresentativePerson?.dob && <><hr />事業責任者の生年月日</>}</div>
                        <div>{stripeRepresentativePerson?.dob && <>{stripeRepresentativePerson?.dob?.year}/{stripeRepresentativePerson?.dob?.month}/{stripeRepresentativePerson?.dob?.day}</>}</div>
                        <div>{stripeRepresentativePerson?.gender && <><hr />代表者の姓別</>}</div>
                        <div>{stripeRepresentativePerson?.gender && (stripeRepresentativePerson?.gender === 'male' ? '男' : '女')}</div>
                        <div>{stripeRepresentativePerson?.phone && <><hr />代表者の電話番号</>}</div>
                        <div>{stripeRepresentativePerson?.phone}</div>
                        <div>{stripeRepresentativePerson?.email && <><hr />代表者のメールアドレス</>}</div>
                        <div>{stripeRepresentativePerson?.email}</div>
                        <div>{stripeRepresentativePerson?.address_kanji?.postal_code && <><hr />代表者の郵便番号</>}</div>
                        <div>{stripeRepresentativePerson?.address_kanji?.postal_code}</div>

                        <div>{stripeRepresentativePerson?.address_kanji?.state && <><hr />代表者の住所（漢字）</>}</div>
                        <div>
                          {stripeRepresentativePerson?.address_kanji?.state}
                          {stripeRepresentativePerson?.address_kanji?.town}
                          {stripeRepresentativePerson?.address_kanji?.city}
                          {stripeRepresentativePerson?.address_kanji?.line1}
                          {stripeRepresentativePerson?.address_kanji?.line2}
                        </div>

                        <div>{stripeRepresentativePerson?.address_kana?.state && <><hr />代表者の住所（カナ）</>}</div>
                        <div>
                          {stripeRepresentativePerson?.address_kana?.state}
                          {stripeRepresentativePerson?.address_kana?.town}
                          {stripeRepresentativePerson?.address_kana?.city}
                          {stripeRepresentativePerson?.address_kana?.line1}
                          {stripeRepresentativePerson?.address_kana?.line2}
                        </div>
                      </>}
                      
                      {stripeAccount?.business_type == 'individual'
                      &&
                      <>
                        <Card.Body>
                          <div>事業形態</div>
                          <div>個人事業主（副業も含む）</div>
                          <div>{stripeAccount?.individual?.first_name && <><hr />事業主様のお名前（漢字）</>}</div>
                          <div>{stripeAccount?.individual?.last_name}{stripeAccount?.individual?.first_name}</div>
                          <div>{stripeAccount?.individual?.first_name_kana && <><hr />事業主様のお名前（カナ）</>}</div>
                          <div>{stripeAccount?.individual?.last_name_kana}{stripeAccount?.individual?.first_name_kana}</div>
                          <div>{stripeAccount?.individual?.dob && <><hr />事業責任者の生年月日</>}</div>
                          <div>{stripeAccount?.individual?.dob.year}/{stripeAccount?.individual?.dob.month}/{stripeAccount?.individual?.dob.day}</div>
                          <div>{stripeAccount?.individual?.gender && <><hr />事業責任者の姓別</>}</div>
                          <div>{stripeAccount?.individual?.gender && (stripeAccount?.individual?.gender === 'male' ? '男' : '女')}</div>
                          <div>{stripeAccount?.individual?.phone && <><hr />事業責任者の電話番号</>}</div>
                          <div>{stripeAccount?.individual?.phone}</div>
                          <div>{stripeAccount?.individual?.email && <><hr />事業責任者のメールアドレス</>}</div>
                          <div>{stripeAccount?.individual?.email}</div>
                          <div>{stripeAccount?.business_url && <><hr />事業のウェブサイト</>}</div>
                          <div>{stripeAccount?.business_url}</div>
                          <div>{stripeAccount?.business_profile?.product_description && <><hr />商品、サービス内容の詳細</>}</div>
                          <div>{stripeAccount?.business_profile?.product_description}</div>
                          <div>{stripeAccount?.individual?.address_kanji.postal_code && <><hr />郵便番号</>}</div>
                          <div>{stripeAccount?.individual?.address_kanji.postal_code}</div>
                          <div>{stripeAccount?.individual && <><hr />住所（漢字）</>}</div>
                          <div> {stripeAccount?.individual?.address_kanji.state}
                                {stripeAccount?.individual?.address_kanji.town}
                                {stripeAccount?.individual?.address_kanji.city}
                                {stripeAccount?.individual?.address_kanji.line1}
                                {stripeAccount?.individual?.address_kanji.line2}</div>
                          <div>{stripeAccount?.individual && <><hr />住所（カナ）</>}</div>
                          <div> {stripeAccount?.individual?.address_kana.state}
                                {stripeAccount?.individual?.address_kana.town}
                                {stripeAccount?.individual?.address_kana.city}
                                {stripeAccount?.individual?.address_kana.line1}
                                {stripeAccount?.individual?.address_kana.line2}</div>
                        </Card.Body>
                      </>}
                  <a href='/admin/sales_transfer/register_business_info' className='btn btn-primary mt20'>事業情報登録</a>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className='mt20'>
                <Card.Header>
                  売上振込先口座情報
                  {stripeAccount?.payouts_enabled && <span className='ml10'>有効<CheckIcon width={20} height={20} fill={'#39FA05'} /></span>}                
                </Card.Header>
                <Card.Body>
                  {stripeAccount?.external_accounts && stripeAccount?.external_accounts?.data.map((account_data, i) => {
                    return (
                      <span key={i}>
                        <div>銀行名</div>
                        <div>{account_data.bank_name}</div>
                        <div>口座番号</div>
                        <div>{"********"}{account_data.last4}</div>
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
              {stripePersons.length !== 0 && 
                <Card className='mt20'>
                  <Card.Header>代表者以外の登録済み事業所有者</Card.Header>
                  <Card.Body>
                    {stripePersons.map((person, i) => {
                      return (
                        <div key={i} className='mt10'>
                          {person.last_name}{person.first_name}
                          <a className='ml20 btn btn-primary' href={`/admin/sales_transfer/${person.public_id}/edit_person`}>編集</a>
                          <hr/>
                        </div>
                      )
                    })}
                  </Card.Body>
                </Card>}
            </Col>
          </Row>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
