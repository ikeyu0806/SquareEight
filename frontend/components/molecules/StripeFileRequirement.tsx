import React from 'react'
import { Card } from 'react-bootstrap'
import StripeFormStyles from 'styles/StripeForm.module.css'
const StripeFileRequirement = () => {
  return (
    <Card className='mt20'>
      <Card.Body>
      <p className={StripeFormStyles.upload_image_guide}>アップロードするファイルは以下の要件を満たしている必要があります。</p>
      &emsp;・カラー画像 (8,000 ピクセル x 8,000 ピクセル以下)<br />
      &emsp;・10 MB 以下<br />
      </Card.Body>
    </Card>
  )
}

export default StripeFileRequirement
