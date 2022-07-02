import React from 'react'
import { Container, Row, Col, Table, FormControl, Form } from 'react-bootstrap'

const CreateResource = (): JSX.Element => {
  return (
    <>
      <Container>
        <div className='text-center mt50 mb50'>
          <h3 className='mb15'>リソース登録</h3>
          <span>スタッフや設備・備品を登録して予約者数を制限することができます。</span>
          <br />
        </div>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <Form.Label>リソース名</Form.Label>
            <FormControl
              // value={name}
              // onChange={(e) => dispatch(nameChanged(e.target.value))}
              placeholder=''
              aria-label='リソース名' />
            <Form.Label className='mt10'>月額料金</Form.Label>
            <FormControl
              // value={name}
              // onChange={(e) => dispatch(nameChanged(e.target.value))}
              placeholder=''
              aria-label='月額料金' />
            <Form.Label className='mt10'>曜日別予約受付設定</Form.Label>
            <Form.Check 
              type='radio'
              id='unlimited'
              label='制限なし'
              onChange={() => console.log('!')}
              checked={true} />
            <Form.Check 
              type='radio'
              id='limited'
              label='営業時間に準ずる'
              onChange={() => console.log('!')}
              checked={!false} />
            <Form.Check 
              type='radio'
              id='limited'
              label='個別に設定する'
              onChange={() => console.log('!')}
              checked={!false} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CreateResource
