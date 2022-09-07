import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import axios from 'axios'
import { Row, Col, Container } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { pageContentChanged } from 'redux/webpageSlice'
import HeadingBlock from 'components/organisms/HeadingBlock'
import { HeadingAtom, ImageSlide } from 'interfaces/PageContentState'
import { ExternalLinkBlockStateType } from 'interfaces/PageContentState'
import { ATOM_TYPE } from 'constants/atomType'
import ImageSlideBlock from 'components/organisms/ImageSlideBlock'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import {  navbarBrandTextChanged,
          navbarBrandTypeChanged,
          navbarBrandImageChanged,
          navbarBrandImageWidthChanged,
          navbarBrandImageHeightChanged,
          navbarBrandBackgroundColorChanged,
          navbarBrandVariantColorChanged,
          footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)

  useEffect(() => {
    const fetchWebpage = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/webpages/${router.query.webpage_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        dispatch(pageContentChanged({blockContent: response.data.webpage.block_contents}))
        dispatch((navbarBrandTextChanged(response.data.shared_component.navbar_brand_text)))
        dispatch((navbarBrandTypeChanged(response.data.shared_component.navbar_brand_type)))
        dispatch((navbarBrandImageChanged(response.data.shared_component.navbar_brand_image_s3_object_public_url)))
        dispatch((navbarBrandImageWidthChanged(response.data.shared_component.nabvar_brand_image_width)))
        dispatch((navbarBrandImageHeightChanged(response.data.shared_component.nabvar_brand_image_height)))
        dispatch((navbarBrandBackgroundColorChanged(response.data.shared_component.navbar_brand_background_color)))
        dispatch((navbarBrandVariantColorChanged(response.data.shared_component.navbar_brand_variant_color)))
        dispatch((footerCopyRightTextChanged(response.data.shared_component.footer_copyright_text)))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchWebpage()
  }, [router.query.id, cookies._square_eight_merchant_session, router.query.webpage_id, dispatch])

  return (
    <MerchantCustomLayout>
      <Container>
        {pageContent.blockContent && pageContent.blockContent.map((block, i) => {
          return (
            <Row key={i}>
                {(block.atoms as HeadingAtom[] | ExternalLinkBlockStateType[] | ImageSlide[]).map((atom, i) => {
                  {switch(atom.atomType) {
                    case ATOM_TYPE.HEADING:
                      return (
                        <Col key={i}>
                          <HeadingBlock atomState={(atom as HeadingAtom)}></HeadingBlock>
                        </Col>)
                    case ATOM_TYPE.EXTERNAL_LINKS:
                      return (
                        <Col key={i}>
                          {(atom as ExternalLinkBlockStateType).content.map((c, i) => {
                            return (
                              <a href={c.url} className='list-group-item list-group-item-action' target='_blank' rel='noreferrer' key={i}>{c.text}</a>
                            )
                          })}
                        </Col>)
                    case ATOM_TYPE.IMAGE_SLIDE:
                      return (
                        <Col key={i}>
                          <ImageSlideBlock atomState={(atom as ImageSlide).imageSlide}></ImageSlideBlock>
                        </Col>
                      )
                    default:
                  }}
                })}
            </Row>)
        })}
      </Container>
    </MerchantCustomLayout>
  )
}

export default Index
