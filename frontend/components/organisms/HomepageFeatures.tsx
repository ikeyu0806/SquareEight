import React from 'react'
import { FeaturesOrganismProps } from '../../interfaces/FeaturesOrganismProps'
import FeaturesMolecules from '../molecules/FeaturesMolecules'

const HomepageFeatures = ({selectable}: FeaturesOrganismProps): JSX.Element => {
  return (
    <FeaturesMolecules headerText='ホームページ作成'
                       FeatureAtomProps1={{title: 'ブログ', text: 'ホームページにブログを投稿できます'}}
                       FeatureAtomProps2={{title: 'カラーパレット', text: '好きな配色を選んでいただければ自動でサイト全体の配色を設定できます'}}
                       FeatureAtomProps3={{title: '独自ドメイン', text: '独自ドメインを設定できます'}}
                       selectable={selectable} />
  )
}

export default HomepageFeatures
