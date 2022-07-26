import CheckIcon from 'components/atoms/CheckIcon'

const ConnectedTextWithIcon = () => {
  return (
    <>
      <span className='mr5'>
        連携済み
      </span>
      <CheckIcon width={20} height={20} fill={'#00ff00'}></CheckIcon>
    </>
  )
}
export default ConnectedTextWithIcon
