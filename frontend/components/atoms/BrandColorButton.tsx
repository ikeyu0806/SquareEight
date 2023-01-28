import { Button } from 'react-bootstrap'
import { brandGrayRgb, brandRedRgb } from 'constants/brandColors'

interface Props {
  buttonText: string
  buttonType?: 'submit' | 'button'
  onClick?: any
  brandColor?: string
  disabled? :boolean
}

const BrandColorButton = ({buttonText, buttonType, onClick, brandColor, disabled}: Props): JSX.Element => {
  return (
    <Button
      style={
        {backgroundColor: brandColor === 'red' ? brandRedRgb : brandGrayRgb,
         borderColor: brandColor === 'red' ? brandRedRgb : brandGrayRgb}
      }
      type={buttonType ? buttonType : 'button'}
      onClick={onClick}
      disabled={disabled}
      variant='primary'>
      {buttonText}
    </Button>
  )
}

export default BrandColorButton
