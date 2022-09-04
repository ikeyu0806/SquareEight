import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import axios from 'axios'
import { Card, Row, Col, Navbar, Container, Form } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { WebpageParam } from 'interfaces/WebpageParam'
import { webpageTagChanged, pageContentChanged } from 'redux/webpageSlice'
import HeadingBlock from 'components/organisms/HeadingBlock'
import { HeadingAtom, ImageSlide } from 'interfaces/PageContentState'
import { ExternalLinkBlockStateType } from 'interfaces/PageContentState'
import { ATOM_TYPE } from 'constants/atomType'
import ImageSlideBlock from 'components/organisms/ImageSlideBlock'

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
        dispatch(pageContentChanged({blockContent: response.data.webpage.block_contents}))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchWebpage()
  }, [router.query.id, cookies._square_eight_merchant_session, router.query.webpage_id, dispatch])

  return (
    <>
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
    </>
  )
}

export default Index
