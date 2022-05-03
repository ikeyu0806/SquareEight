import React from 'react'
import FeaturesMolecules from '../molecules/FeaturesMolecules'

type Props = {
  selectable?: boolean
}

const FeaturesTemplates = ({selectable}: Props): JSX.Element => {
  return (
    <>
      <FeaturesMolecules headerText='ホームページ作成'
                         FeatureAtomProps1={{title: 'ホームページ作成', text: '専門知識不要でホームページを作成できます'}}
                         FeatureAtomProps2={{title: 'カラーパレット設定', text: '好きな配色を選んでいただければ自動でサイト全体の配色を設定できます'}}
                         FeatureAtomProps3={{title: '独自ドメイン設定', text: '独自ドメインを設定できます'}}
                         selectable={selectable} />
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

export default FeaturesTemplates
