import React from 'react'
import { FeaturesOrganismProps } from '../../intefaces/FeaturesOrganismProps'
import FeaturesMolecules from '../molecules/FeaturesMolecules'

const ReserveFeatures = ({selectable}: FeaturesOrganismProps): JSX.Element => {
  return (
    <>
      <FeaturesMolecules headerText='予約管理'
                         FeatureAtomProps1={{title: 'オンライン予約', text: 'カレンダーから24時間予約受付できます'}}
                         FeatureAtomProps2={{title: 'スタッフ', text: '予約枠に担当スタッフを設定できます'}}
                         FeatureAtomProps3={{title: '設備・備品', text: '設備・備品によって予約枠の上限を設定できます'}}
                         selectable={selectable} />
      <FeaturesMolecules headerText='オンライン決済'
                         FeatureAtomProps1={{title: 'クレジットカード決済', text: 'レッスンに対する支払いを自動化できます'}}
                         FeatureAtomProps2={{title: '月謝', text: '月謝を設定できます'}}
                         FeatureAtomProps3={{title: '回数券', text: '回数券を作成できます'}}
                         selectable={selectable} />
      <FeaturesMolecules headerText='顧客管理'
                         FeatureAtomProps1={{title: 'クレジットカード決済', text: '管理画面から連絡先、受講履歴など顧客情報を管理できます'}}
                         FeatureAtomProps2={{title: 'メール送信', text: '顧客にメールを送信できます'}}
                         FeatureAtomProps3={{title: 'LINEでのコミュニケーション', text: '専用のLINEアカウントを作成し顧客とコミュニケーションを取ることができます'}}
                         selectable={selectable} />
    </>
  )
}

export default ReserveFeatures
