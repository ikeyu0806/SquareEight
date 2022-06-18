import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Container, Navbar, Nav, Button, Modal, Form } from 'react-bootstrap'
import AdminNavbarTemplate from '../../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../../components/organisms/RegularFooter'
import PencilSquareIcon from '../../../../components/atoms/PencilSquareIcon'
import { showEditHeaderModalChanged, showEditFooterModalChanged } from '../../../../redux/homepageSlice'
import { RootState } from '../../../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { navbarLink } from '../../../../interfaces/WebsiteHeaderType'

const EditSharedComponent: NextPage = () => {
  const dispatch = useDispatch()
  const showEditHeaderModal = useSelector((state: RootState) => state.homepage.showEditHeaderModal)
  const showEditFooterModal = useSelector((state: RootState) => state.homepage.showEditFooterModal)
  const [title, setTitle] = useState('')
  const [inputLinkText, setInputLinkText] = useState('')
  const [inputLink, setInputLink] = useState('')
  const [navbarLinks, setNavbarLinks] = useState<navbarLink[]>([])

  const onClickAddLinkButton = () => {
    let updateNavbarLinks: navbarLink[]
    updateNavbarLinks = [...navbarLinks, {text: inputLinkText, link: inputLink }]
    setNavbarLinks(updateNavbarLinks)
    setInputLinkText('')
    setInputLink('')
  }

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
        <div onClick={() => dispatch(showEditHeaderModalChanged(true))} className='mt30'>
          <h4>ヘッダを編集<PencilSquareIcon height={30} width={30} fill={'green'}></PencilSquareIcon></h4>
        </div>
        <Modal show={showEditHeaderModal} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>ヘッダを編集してください</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>見出し</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Text>リンク表示名</Form.Text>
              <Form.Control placeholder='企業情報'
                            value={inputLinkText}
                            onChange={(e) => setInputLinkText(e.target.value)}></Form.Control>
              <Form.Text>URL</Form.Text>
              <Form.Control placeholder='https://sample.com'
                            value={inputLink}
                            onChange={(e) => setInputLink(e.target.value)}></Form.Control>
              <Button className='mt20' onClick={onClickAddLinkButton}>リンクを追加</Button>
            </Form.Group>
            <h3 className='mt10 mb10'>サンプル</h3>
            <Navbar bg='light' expand='lg'>
              <Container>
                <Navbar.Brand>見出し</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                  <Nav>
                    <Nav.Link>リンク1</Nav.Link>
                    <Nav.Link>リンク2</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <h3 className='mt10 mb10'>プレビュー</h3>
            <Navbar bg='light' expand='lg'>
              <Container>
                <Navbar.Brand>{title}</Navbar.Brand>
                <Navbar.Toggle />
                  <Navbar.Collapse>
                    <Nav>
                      {navbarLinks.map((link, i) => {
                        return (
                          <Nav.Link href={link.link} key={i}>
                            {link.text}
                          </Nav.Link>
                        )
                      })}
                    </Nav>
                  </Navbar.Collapse>
              </Container>
            </Navbar>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => dispatch(showEditHeaderModalChanged(false))}>閉じる</Button>
            <Button variant='primary'>編集を完了</Button>
          </Modal.Footer>
        </Modal>
        <br />
        <h2 className='mt20 mb20'>フッタプレビュー</h2>
        <footer className='content text-center'>
          <hr />
          <p className='footer-margin'>Copyright SampleCompany {new Date().getFullYear()}</p>
        </footer>
        <div onClick={() => dispatch(showEditFooterModalChanged(true))} className='mt30'>
          <h4>フッタを編集<PencilSquareIcon height={30} width={30} fill={'green'}></PencilSquareIcon></h4>
        </div>
        <Modal show={showEditFooterModal} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>フッタを編集してください</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <footer className='content text-center'>
              <hr />
              <p className='footer-margin'>Copyright SampleCompany {new Date().getFullYear()}</p>
            </footer>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => dispatch(showEditFooterModalChanged(false))}>閉じる</Button>
            <Button variant='primary'>編集を完了</Button>
          </Modal.Footer>
        </Modal>
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
