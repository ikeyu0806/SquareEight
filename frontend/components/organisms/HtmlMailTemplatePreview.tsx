import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { ImageWithTextListTypeTemplateContent, ImageWithTextTemplateContent } from 'interfaces/HtmlMailTemplate'

const HtmlMailTemplatePreview = (): JSX.Element => {
  const selectedHtmlMailTemplate = useSelector((state: RootState) => state.sendMail.selectedHtmlMailTemplate)

  return (
    <>
      {selectedHtmlMailTemplate.content && (JSON.parse(selectedHtmlMailTemplate.content) as ImageWithTextTemplateContent[] | ImageWithTextListTypeTemplateContent[]).map((c, i) => {
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
    </>
  )
}

export default HtmlMailTemplatePreview
