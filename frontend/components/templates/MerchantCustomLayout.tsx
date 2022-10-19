import { ReactNode } from 'react'
import MerchantCustomNavbar from 'components/molecules/MerchantCustomNavbar'
import MerchantCustomFooter from 'components/molecules/MerchantCustomFooter'
interface Props {
  children: ReactNode
}

const MerchantCustomLayout = ({children}: Props): JSX.Element => {
  return (
    <>
      <MerchantCustomNavbar></MerchantCustomNavbar>
        {children}
      <MerchantCustomFooter></MerchantCustomFooter>
    </>
  )
}

export default MerchantCustomLayout
