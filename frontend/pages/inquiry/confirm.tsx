import type { NextPage } from 'next'
import { Container, Card } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'

const Confirm: NextPage = () => {
  return (
    <>
      <WithoutSessionLayout>
        <Container>
          <div className='text-center mt20'>
            <div>お問い合わせを受け付けました。</div>
            <br/>
            <div>返信先メールアドレスにお問い合わせ内容を送信しています。</div>
          </div>
        </Container>
      </WithoutSessionLayout>
    </>
  )
}

export default Confirm
