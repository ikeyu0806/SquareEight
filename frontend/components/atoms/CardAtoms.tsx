import React, { useState } from 'react'
import { FeatureAtomProps } from '../../types/FeatureAtomProps'
import { Col,
         Card } from 'react-bootstrap'  

const FeaturesAtoms = ({selectable, title, text}: FeatureAtomProps): JSX.Element => {

  const [isCheck, setIsCheck] = useState(false)

  return (
    <Col onClick={() => setIsCheck(!isCheck)}>
      <Card border={isCheck ? 'primary' : ''}>
        <Card.Body>
          <Card.Title>
           {selectable && <input className='form-check-input mr10' type='checkbox' checked={isCheck} />}
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
