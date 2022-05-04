import React from 'react'
import HomepageFeatures from '../organisms/HomepageFeatures'
import ReserveFeatures from '../organisms/ReserveFeatures'

type Props = {
  selectable?: boolean
}

const FeaturesTemplates = ({selectable}: Props): JSX.Element => {
  return (
    <>
      <HomepageFeatures selectable={selectable} />
      <ReserveFeatures selectable={selectable} />
    </>
  )
}

export default FeaturesTemplates
