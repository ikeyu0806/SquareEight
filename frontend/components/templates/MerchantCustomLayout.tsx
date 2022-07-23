import { ReactNode, useState } from 'react'
import CommonNavbar from 'components/organisms/CommonNavbar'
import RegularFooter from 'components/organisms/RegularFooter'
import { WebsiteHeaderType } from 'interfaces/WebsiteHeaderType'
import { WebsiteFooterType } from 'interfaces/WebsiteFooterType'
interface Props {
  children: ReactNode
}

const MerchantCustomLayout = ({children}: Props): JSX.Element => {
  const [header, setHeader] = useState<WebsiteHeaderType>({brandText: '', brandImage: '', bodyContent: []})
  const [footer, setFooter] = useState<WebsiteFooterType>()

  return (
    <>
      <CommonNavbar></CommonNavbar>
        {children}
      <RegularFooter></RegularFooter>
    </>
  )
}

export default MerchantCustomLayout
