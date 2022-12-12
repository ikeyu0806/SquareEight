import { Button } from 'react-bootstrap'

interface Props {
  onClick: any
  text: string
}

const LineBrandColorButton = ({onClick, text}: Props): JSX.Element => {
  return (
    <Button
      className='line-forest-green'
      style={{backgroundColor: '#06C755', borderColor: '#06C755'}}
      variant='secondary'
      onClick={onClick}>{text}</Button>
  )
}

export default LineBrandColorButton
