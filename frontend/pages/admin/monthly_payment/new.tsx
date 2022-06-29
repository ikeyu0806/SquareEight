import { NextPage } from "next"
import CreateMonthlyPayment from "components/templates/CreateMonthlyPayment"
import { Container } from "react-bootstrap"
import AdminNavbarTemplate from "components/templates/AdminNavbarTemplate"
import RegularFooter from '../../../components/organisms/RegularFooter'

const New: NextPage = () => {
  return (
    <>
      <AdminNavbarTemplate></AdminNavbarTemplate>
      <Container>
        <CreateMonthlyPayment></CreateMonthlyPayment>
      </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default New
