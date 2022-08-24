import CheckIcon from 'components/atoms/CheckIcon'

interface Props {
  text: string
  fill: string
}

const TextWithCheckIcon = ({text, fill}: Props): JSX.Element => {
  return (
    <>
      <CheckIcon width={20} height={20} fill={fill} /><span className='ml10'>{text}</span>
    </>
  )
}

export default TextWithCheckIcon
