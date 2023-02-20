import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const MerchantCustomNavbar = () => {
  const navbarBrandType =  useSelector((state: RootState) => state.sharedComponent.navbarBrandType)
  const navbarBrandText =  useSelector((state: RootState) => state.sharedComponent.navbarBrandText)
  const navbarBrandImagePublicUrl =  useSelector((state: RootState) => state.sharedComponent.navbarBrandImagePublicUrl)
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
            navbarBrandImagePublicUrl &&
            <img
              width={navbarBrandImageWidth}
              height={navbarBrandImageHeight}
              className='d-block w-100 mt30'
              src={navbarBrandImagePublicUrl}
              alt='image'/>
            }
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}
export default MerchantCustomNavbar
