import { Form } from 'react-bootstrap'

const StripeTerm = (): JSX.Element => {
  return(
    <>
      <h4 className='mt30 mb30'>利用規約</h4>
      <p className='text-break'>
      [プラットフォームの名称]における[アカウント所有者を示す文言（例えばドライバー又は売り手）]向けの支払処理サービスは、Stripe が提供し、Stripe Connect アカウント契約（Stripe 利用規約を含み、総称して「Stripe サービス契約」といいます。）に従うものとします。[本契約、本条件等]への同意又は[プラットフォームの名称]において[アカウント所有者を示す文言]としての取引の継続により、お客様は Stripe サービス契約（随時 Stripe により修正されることがあり、その場合には修正されたものを含みます。）に拘束されることに同意するものとします。Stripe を通じた支払処理サービスを[プラットフォームの名称]ができるようにするための条件として、お客様は、[プラットフォームの名称]に対してお客様及びお客様の事業に関する正確かつ完全な情報を提供することに同意し、[プラットフォームの名称]が当該情報及び Stripe が提供する支払処理サービスのお客様による使用に関連する取引情報を共有することを認めるものとします。
      </p>
      <Form.Check 
        type='checkbox'
        label='利用規約に同意する'
      />
    </>
  )
}

export default StripeTerm
