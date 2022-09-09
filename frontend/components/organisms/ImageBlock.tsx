import { ImageAtom } from 'interfaces/PageContentState'

type propType = {
  atomState: ImageAtom
}

const ImageBlock = (props: propType): JSX.Element => {
  return (
    <img
      className='d-block w-100'
      src={props.atomState.image}
      alt='imageAtom'
    />     
  )
}

export default ImageBlock
