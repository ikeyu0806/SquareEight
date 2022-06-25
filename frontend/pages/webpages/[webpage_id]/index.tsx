import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import axios from 'axios'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'
import { WebpageParam } from '../../../interfaces/WebpageParam'
import { webpageTagChanged, pageContentChanged } from '../../../redux/homepageSlice'
import { HeadingBlockState } from '../../../interfaces/HeadingBlockState'
import HeadingBlock from '../../../components/organisms/HeadingBlock'
import TextImageBlock from '../../../components/organisms/TextImageBlock'
import ImageSlideBlock from '../../../components/organisms/ImageSlideBlock'
import { BLOCK_TYPE } from '../../../constants/blockType'
import { ExternalLinkBlockStateType } from '../../../types/ExternalLinkBlockStateType'
import { TextImageBlockStateType } from '../../../types/TextImageBlockStateType'
import { WebsiteHeaderType } from '../../../interfaces/WebsiteHeaderType'
import { WebsiteFooterType } from '../../../interfaces/WebsiteFooterType'
import { ImageSlideState } from '../../../types/ImageSlideState'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)
  const [header, setHeader] = useState<WebsiteHeaderType>({brandText: '', brandImage: '', bodyContent: []})
  const [footer, setFooter] = useState<WebsiteFooterType>()

  useEffect(() => {
    const fetchWebpage = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/webpages/${router.query.webpage_id}`, {
          headers: { 
            'Session-Id': cookies._smartlesson_session
          },
        }
      )
      .then(function (response) {
        const webpageResponse: WebpageParam = response.data.webpage
        dispatch(webpageTagChanged(webpageResponse.tag))
        dispatch(pageContentChanged(webpageResponse.block_contents || []))
        if (webpageResponse.header_json !== undefined) {
          setHeader(webpageResponse.header_json)
          setFooter(webpageResponse.footer_json)
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchWebpage()
  }, [router.query.id, cookies._smartlesson_session, router.query.webpage_id, dispatch])

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand>{header.brandText}</Navbar.Brand>
          <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav>
                {header.bodyContent.map((link: any, i) => {
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
      <br />
      <Container>
        {pageContent.map((page, i) =>
          {
            switch (page.blockType) {
              case BLOCK_TYPE.HEADING:
                return (
                  <span key={i}>
                    <HeadingBlock blockState={(page.blockState) as HeadingBlockState}></HeadingBlock>
                  </span>
                )
              case BLOCK_TYPE.IMAGE_SLIDE:
                return (
                  <div key={i}>
                    <ImageSlideBlock blockState={(page.blockState) as ImageSlideState}></ImageSlideBlock>
                  </div>
              )
              case BLOCK_TYPE.TEXT_IMAGE:
                return (
                  <div key={i}>
                    <TextImageBlock blockState={(page.blockState) as TextImageBlockStateType}></TextImageBlock>
                  </div>
                )
              case BLOCK_TYPE.EXTERNAL_LINKS:
                return [
                  (page.blockState as ExternalLinkBlockStateType).content.map((block, i) => {
                    return (
                      <a href={block.url} className='list-group-item list-group-item-action' target='_blank' rel='noreferrer' key={i}>{block.text}</a>
                    )
                  }),
                ]
              default:
                console.log('invalid block')
            }
          }
        )}
      </Container>
      <footer className='content text-center'>
        <hr />
        <p className='footer-margin'>{footer?.text}</p>
      </footer>
    </>
  )
}

export default Index
