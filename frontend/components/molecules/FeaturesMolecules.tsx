import React from 'react'
import FeatureAtoms from '../atoms/FeatureAtoms'
import { FeaturesMoleculeProps } from '../../intefaces/FeaturesMoleculeProps'
import { Container,
         Row,
         Col,
         Card } from 'react-bootstrap'

const FeaturesMolecules = ({headerText, FeatureAtomProps1, FeatureAtomProps2, FeatureAtomProps3, selectable}: FeaturesMoleculeProps): JSX.Element => {
  return (
    <>
      <div className='text-center mt20 mb20'>
        <h3>{headerText}</h3>
      </div>
      <Container>
        <Row>
          <FeatureAtoms title={FeatureAtomProps1.title} text={FeatureAtomProps1.text} selectable={selectable} />
          {FeatureAtomProps2 && <FeatureAtoms title={FeatureAtomProps2.title} text={FeatureAtomProps2.text} selectable={selectable} />}
          {FeatureAtomProps3 && <FeatureAtoms title={FeatureAtomProps3.title} text={FeatureAtomProps3.text} selectable={selectable} />}
        </Row>
      </Container>
    </>
  )
}

export default FeaturesMolecules
