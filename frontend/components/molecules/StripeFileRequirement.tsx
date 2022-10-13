import React from 'react'
import { Card } from 'react-bootstrap'

const StripeFileRequirement = () => {
  return (
    <Card className='mt20'>
      <Card.Body>
      アップロードするファイルは以下の要件を満たしている必要があります。<br />
      &emsp;・カラー画像 (8,000 ピクセル x 8,000 ピクセル以下)<br />
      &emsp;・10 MB 以下<br />
      &emsp;・JPG または PNG 形式が使用可能<br />
      </Card.Body>
    </Card>
  )
}

export default StripeFileRequirement
