import { HeadingAtom } from 'interfaces/PageContentState'

interface propType {
  atomState: HeadingAtom
}

const HeadingBlock = (props: propType): JSX.Element => {
  return (
    <div className={props.atomState.placement === 'left' ? 'text-left' : props.atomState.placement === 'center' ? 'text-center' : 'text-right'}>
                   {props.atomState.size === 1 && <h1>{props.atomState.text}</h1>}
                   {props.atomState.size === 2 && <h2>{props.atomState.text}</h2>}
                   {props.atomState.size === 3 && <h3>{props.atomState.text}</h3>}
                   {props.atomState.size === 4 && <h4>{props.atomState.text}</h4>}
                   {props.atomState.size === 5 && <h5>{props.atomState.text}</h5>}
                   {props.atomState.size === 6 && <h6>{props.atomState.text}</h6>}
    </div>
  )
}

export default HeadingBlock
