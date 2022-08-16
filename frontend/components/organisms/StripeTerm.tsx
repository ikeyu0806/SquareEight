import { Form } from 'react-bootstrap'
import { isTermConfirmedChanged } from 'redux/stripeAccountSlice'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'

const StripeTerm = (): JSX.Element => {
  const isTermConfirmed = useSelector((state: RootState) => state.stripeAccount.isTermConfirmed)
  const dispatch = useDispatch()

  return(
    <>
      <h4 className='mt30 mb30'>利用規約</h4>
      <p className='text-break'>
      GYBuilderにおけるビジネスアカウント向けの支払処理サービスは、Stripe が提供し、Stripe Connect アカウント契約（Stripe 利用規約を含み、総称して「Stripe サービス契約」といいます。）に従うものとします。[本契約、本条件等]への同意又はGYBuilderにおいてビジネスアカウントとしての取引の継続により、お客様は Stripe サービス契約（随時 Stripe により修正されることがあり、その場合には修正されたものを含みます。）に拘束されることに同意するものとします。Stripe を通じた支払処理サービスをGYBuilderができるようにするための条件として、お客様は、GYBuilderに対してお客様及びお客様の事業に関する正確かつ完全な情報を提供することに同意し、GYBuilderが当該情報及び Stripe が提供する支払処理サービスのお客様による使用に関連する取引情報を共有することを認めるものとします。
      </p>
      <Form.Check 
        checked={isTermConfirmed}
        onChange={() => dispatch(isTermConfirmedChanged(!isTermConfirmed))}
        type='checkbox'
        label='利用規約に同意する'
      />
    </>
  )
}

export default StripeTerm
