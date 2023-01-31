import { IconProp } from '../../interfaces/IconProp'

const DownArrawIcon = ({width, height, fill, rotateText}: IconProp) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      transform={rotateText}
      id='DownArrawIcon'
      data-name='DownArrawIcon'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'>
      <title>Trade_Icons</title>
      <polygon points='2.38 7 14.38 7 8.38 14 2.38 7'/><rect x='6.38' y='2.11' width='4' height='6' transform='translate(16.75 10.22) rotate(-180)'/>
    </svg>
  )
}

export default DownArrawIcon
