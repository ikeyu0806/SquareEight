import React from 'react'
import CardAtoms from '../atoms/CardAtoms'
import { FeaturesMoleculeProps } from '../../intefaces/FeaturesMoleculeProps'
import { Container,
         Row,
         Col } from 'react-bootstrap'

const FeaturesMolecules = ({headerText, FeatureAtomProps1, FeatureAtomProps2, FeatureAtomProps3, selectable}: FeaturesMoleculeProps): JSX.Element => {
  return (
    <>
      <div className='text-center mt20 mb20'>
        <h3>{headerText}</h3>
      </div>
      <Container>
        <Row>
          <CardAtoms title={FeatureAtomProps1.title} text={FeatureAtomProps1.text} selectable={selectable} />
          {FeatureAtomProps2 ? <CardAtoms title={FeatureAtomProps2.title} text={FeatureAtomProps2.text} selectable={selectable} /> : <Col></Col>}
          {FeatureAtomProps3 ? <CardAtoms title={FeatureAtomProps3.title} text={FeatureAtomProps3.text} selectable={selectable} /> : <Col></Col>}
        </Row>
      </Container>
    </>
  )
}

export default FeaturesMolecules
