import { HeadingBlockState } from "../../interfaces/HeadingBlockState"

type propType = {
  blockState: HeadingBlockState
}

const HeadingBlock = (props: propType): JSX.Element => {
  return (
    <div className={props.blockState.placement === 'left' ? 'text-left' : props.blockState.placement === 'center' ? 'text-center' : 'text-right'}>
                   {props.blockState.size === 1 && <h1>{props.blockState.text}</h1>}
                   {props.blockState.size === 2 && <h2>{props.blockState.text}</h2>}
                   {props.blockState.size === 3 && <h3>{props.blockState.text}</h3>}
                   {props.blockState.size === 4 && <h4>{props.blockState.text}</h4>}
                   {props.blockState.size === 5 && <h5>{props.blockState.text}</h5>}
                   {props.blockState.size === 6 && <h6>{props.blockState.text}</h6>}
    </div>
  )
}

export default HeadingBlock
