import { Button } from 'react-bootstrap'
import { brandGrayRgb, brandRedRgb } from 'constants/brandColors'

interface Props {
  buttonText: string
  buttonType?: string
  onSubmit?: any
  brandColor?: string
}

const BrandColorButton = ({buttonText, buttonType, onSubmit, brandColor}: Props): JSX.Element => {
  return (
    <Button
      style={
        {backgroundColor: brandColor === 'red' ? brandRedRgb : brandGrayRgb,
         borderColor: brandColor === 'red' ? brandRedRgb : brandGrayRgb}
      }
      onClick={onSubmit}
      variant='primary'>
      {buttonText}
    </Button>
  )
}

export default BrandColorButton
