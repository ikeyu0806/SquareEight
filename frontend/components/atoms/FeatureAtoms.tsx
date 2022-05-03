import React from 'react'
import { FeatureAtomProps } from '../../intefaces/FeatureAtomProps'
import { Col,
         Card } from 'react-bootstrap'

type Props = {
  selectable?: boolean
  title: string
  text: string
}        

const FeaturesAtoms = ({selectable, title, text}: FeatureAtomProps): JSX.Element => {
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>
           {selectable && <input className='form-check-input mr10' type='checkbox' />}
           {title}
          </Card.Title>
          <Card.Text>
            {text}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default FeaturesAtoms
