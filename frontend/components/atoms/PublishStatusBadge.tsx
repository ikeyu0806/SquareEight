interface Props {
  publishStatus: string
}

const PublishStatusBadge = ({publishStatus}: Props) => {
  return (
    <>
      {publishStatus === 'Publish' && <span className='badge bg-info ml10'>公開</span>}
      {publishStatus === 'Unpublish' && <span className='badge bg-danger ml10'>非公開</span>}
    </>
  )
}

export default PublishStatusBadge
