import { IconProp } from '../../interfaces/IconProp'

const CaretDownSquare = ({width, height, fill}: IconProp) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} fill={fill} className='bi bi-caret-down-square-fill' viewBox='0 0 16 16'>
      <path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z'/>
    </svg>
  )
}

export default CaretDownSquare
