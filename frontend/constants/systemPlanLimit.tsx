// 現状LPとビジネスアカウント管理画面のプラン変更画面で使う

export const RESERVATION_LIMIT = {
  Free: 500,
  Light: 1000,
  Standard: 3000,
  Premium: '無制限',
} as const

export const CUSTOMER_DISPLAY_LIMIT = {
  Free: 100,
  Light: 300,
  Standard: 1000,
  Premium: '無制限',
} as const

export const QUESTIONNAIRE_MASTER_LIMIT = {
  Free: '無制限',
  Light: '無制限',
  Standard: '無制限',
  Premium: '無制限',
} as const
