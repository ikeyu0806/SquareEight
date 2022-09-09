import { TextAtom } from 'interfaces/PageContentState'

interface propType {
  atomState: TextAtom
}

const TextBlock = (props: propType): JSX.Element => {
  return (
    <div className='new-line'>
      {props.atomState.text}
    </div>
  )
}

export default TextBlock
