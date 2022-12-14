import { Button } from 'react-bootstrap'

interface Props {
  onClick: any
  text: string
  size?: 'sm' | 'lg' | undefined
}

const LineBrandColorButton = ({onClick, text, size}: Props): JSX.Element => {
  return (
    <Button
      size={size}
      className='line-forest-green'
      style={{backgroundColor: '#06C755', borderColor: '#06C755'}}
      variant='secondary'
      onClick={onClick}>{text}</Button>
  )
}

export default LineBrandColorButton
