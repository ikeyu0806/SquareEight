const ResouceLimitGuide = () => {
  return (
    <div className='color-red text-center'>
      <div>リソース登録可能数を超えています</div>
      <div className='mt10'>
        <a href='/admin/plan/choice'>プランをアップグレードすることで追加登録できます</a>
      </div>
    </div>
  )
}

export default ResouceLimitGuide
