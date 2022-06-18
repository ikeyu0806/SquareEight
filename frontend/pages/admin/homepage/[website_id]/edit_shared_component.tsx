import type { NextPage } from 'next'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import AdminNavbarTemplate from '../../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../../components/organisms/RegularFooter'
import PencilSquareIcon from '../../../../components/atoms/PencilSquareIcon'

const EditSharedComponent: NextPage = () => {
  return (
    <>
      <AdminNavbarTemplate></AdminNavbarTemplate>
      <Container>
        <h2 className='mt20 mb20'>ヘッダプレビュー</h2>
        <Navbar bg='light' expand='lg'>
          <Container>
            <Navbar.Brand href='#home'>見出しを入力</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link href='#home'>リンク1</Nav.Link>
                <Nav.Link href='#link'>リンク2</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <h4>ヘッダを編集<PencilSquareIcon height={30} width={30} fill={'green'}></PencilSquareIcon></h4>
        <h2 className='mt20 mb20'>フッタプレビュー</h2>
        <footer className='content text-center'>
          <hr />
          <p className='footer-margin'>Copyright SampleCompany {new Date().getFullYear()}</p>
        </footer>
        <h4>フッタを編集<PencilSquareIcon height={30} width={30} fill={'green'}></PencilSquareIcon></h4>
      </Container>
      <br />
      <div className='text-center'>
        <Button>編集を完了</Button>
      </div>
      <Container></Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default EditSharedComponent
