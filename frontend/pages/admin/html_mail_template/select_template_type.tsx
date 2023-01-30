import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import CheckIcon from 'components/atoms/CheckIcon'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'

const New: NextPage = () => {
  const [selectedType, setSelectedType] = useState('ImageWithText')
  const allowReadHtmlMailTemplate = useSelector((state: RootState) => state.merchantUserPermission.allowReadHtmlMailTemplate)

  return (
    <MerchantUserAdminLayout>
      {allowReadHtmlMailTemplate === 'Allow' && <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <h4>HTMLメールテンプレート作成</h4>
            <Row>
              <Col lg={8}>
                <div className='mt20 mb20'>テンプレートタイプを選択してください</div>
              </Col>
              <Col>
                <a
                  href={`/admin/html_mail_template/new?template_type=${selectedType}`}
                  className='btn btn-primary'>選択を終えて次へ</a>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card
                  onClick={() => setSelectedType('ImageWithText')}
                  style={selectedType === 'ImageWithText' ? { borderWidth: '3px', borderColor: '#00ff00' } : {}}>
                  <Card.Header className='d-flex justify-content-between align-items-center'>
                    <span>画像+テキスト</span>
                    {selectedType === 'ImageWithText' && <CheckIcon width={20} height={20} fill={'#00ff00'}></CheckIcon>}
                  </Card.Header>
                  <Card.Body>                  
                    <Card.Img variant='top' src='/images/desk_image.jpeg' />
                    <div>
                      テキスト本文テキスト本文テキスト本文テキスト本文テキスト本文テキスト本文テキスト本文
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  style={selectedType === 'ImageWithTextList' ? { borderWidth: '3px', borderColor: '#00ff00' } : {}}
                  onClick={() => setSelectedType('ImageWithTextList')}>
                  <Card.Header className='d-flex justify-content-between align-items-center'>
                    画像・テキストリスト
                    {selectedType === 'ImageWithTextList' && <CheckIcon width={20} height={20} fill={'#00ff00'}></CheckIcon>}
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Img variant='top' src='/images/desk_image.jpeg' />
                      </Col>
                      <Col>
                        <div>
                          商品Aのご紹介
                        </div>
                      </Col>
                    </Row>
                    &nbsp;
                    <Row>
                      <Col>
                        <Card.Img variant='top' src='/images/desk_image.jpeg' />
                      </Col>
                      <Col>
                        <div>
                          商品Bのご紹介
                        </div>
                      </Col>
                    </Row>    
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>}
      {allowReadHtmlMailTemplate === 'Forbid' && <Unauthorized></Unauthorized>}
    </MerchantUserAdminLayout>
  )
}

export default New
