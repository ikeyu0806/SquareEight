import React from 'react'
import { Navbar, Container, Form, Row, Col } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const MerchantCustomNavbar = () => {
  const navbarBrandType =  useSelector((state: RootState) => state.sharedComponent.navbarBrandType)
  const navbarBrandText =  useSelector((state: RootState) => state.sharedComponent.navbarBrandText)
  const navbarBrandImage =  useSelector((state: RootState) => state.sharedComponent.navbarBrandImage)
  const navbarBrandImageWidth =  useSelector((state: RootState) => state.sharedComponent.navbarBrandImageWidth)
  const navbarBrandImageHeight =  useSelector((state: RootState) => state.sharedComponent.navbarBrandImageHeight)
  const navbarBrandBackgroundColor =  useSelector((state: RootState) => state.sharedComponent.navbarBrandBackgroundColor)
  const navbarBrandVariantColor =  useSelector((state: RootState) => state.sharedComponent.navbarBrandVariantColor)

  return (
    <>
      <Navbar bg={navbarBrandBackgroundColor} variant={navbarBrandVariantColor as 'dark' || 'light'} expand='lg'>
        <Container>
          <Navbar.Brand href='/'>
            {navbarBrandType === 'text' &&
            <span className='font-weight-bold'>
              {navbarBrandText}
            </span>}
            {navbarBrandType === 'image' &&
            navbarBrandImage &&
            <img
              width={navbarBrandImageWidth}
              height={navbarBrandImageHeight}
              className='d-block w-100 mt30'
              src={navbarBrandImage}
              alt='image'/>
            }
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}
export default MerchantCustomNavbar
