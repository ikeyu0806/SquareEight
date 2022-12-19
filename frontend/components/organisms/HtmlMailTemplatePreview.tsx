import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { ImageWithTextListTypeTemplateContent, ImageWithTextTemplateContent } from 'interfaces/HtmlMailTemplate'
import { Row, Col } from 'react-bootstrap'

const HtmlMailTemplatePreview = (): JSX.Element => {
  const selectedHtmlMailTemplate = useSelector((state: RootState) => state.sendMail.selectedHtmlMailTemplate)

  return (
    <>
      {selectedHtmlMailTemplate.template_type === 'ImageWithText'
        && selectedHtmlMailTemplate.content && (JSON.parse(selectedHtmlMailTemplate.content) as ImageWithTextTemplateContent[] | ImageWithTextListTypeTemplateContent[]).map((c, i) => {
        return (
          <div key={i}>
            <img
              className='d-block w-100 mt30'
              src={c.image}
              alt='image'
            />
            <div>{c.text}</div>
          </div>
        )})
      }
      {selectedHtmlMailTemplate.template_type === 'ImageWithTextList'
        && selectedHtmlMailTemplate.content && (JSON.parse(selectedHtmlMailTemplate.content) as ImageWithTextTemplateContent[] | ImageWithTextListTypeTemplateContent[]).map((c, i) => {
        return (
          <Row key={i}>
            <Col>
              <img
                className='d-block w-100 mt30'
                src={c.image}
                alt='image'
              />
            </Col>
            <Col>
              <div>{c.text}</div>
            </Col>
          </Row>
        )})
      }
    </>
  )
}

export default HtmlMailTemplatePreview
