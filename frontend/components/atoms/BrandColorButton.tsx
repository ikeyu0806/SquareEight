import { Button } from 'react-bootstrap'
import { brandGrayRgb, brandRedRgb } from 'constants/brandColors'

interface Props {
  buttonText: string
  buttonType?: 'submit' | 'button'
  onClick?: any
  brandColor?: string
}

const BrandColorButton = ({buttonText, buttonType, onClick, brandColor}: Props): JSX.Element => {
  return (
    <Button
      style={
        {backgroundColor: brandColor === 'red' ? brandRedRgb : brandGrayRgb,
         borderColor: brandColor === 'red' ? brandRedRgb : brandGrayRgb}
      }
      type={buttonType ? buttonType : 'button'}
      onClick={onClick}
      variant='primary'>
      {buttonText}
    </Button>
  )
}

export default BrandColorButton
