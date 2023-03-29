export const defaultJsonLdData = {
  '@context': 'http://schema.org/',
  '@type': 'Service',
  'name': 'SquareEight',
  'description': 'オンラインショップ開設、予約システム、回数券発行、サブスクリプション支払い対応、オンラインアンケート機能、顧客管理をオールインワンで提供。',
}

export const wellnessLpJsonLdData = {
  '@context': 'http://schema.org/',
  '@type': 'Service',
  'name': 'SquareEight',
  'description': 'パーソナルトレーニング・ヨガ・ジム・スポーツスクール・リラク・整体ビジネスを最適化。格安予約システム「SquareEight」',
}

export const beautyLpJsonLdData = {
  '@context': 'http://schema.org/',
  '@type': 'Service',
  'name': 'SquareEight',
  'description': '美容室・ヘアサロン・ネイルサロン・まつげサロン・メイクサロン・医療クリニックの運営を最適化。格安予約システム「SquareEight」',
}

export const eventLpJsonLdData = {
  '@context': 'http://schema.org/',
  '@type': 'Service',
  'name': 'SquareEight',
  'description': 'イベント・セミナー・体験会のオンライン予約受付に。格安予約システム「SquareEight」',
}

export const corporationJsonLdData = {
  '@context': 'http://schema.org/',
  '@type': 'Organization',
  'name': 'SquareEight',
  'description': 'クラウドサービスSquareEightの運営会社',
  'url': process.env.FRONTEND_URL,
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Shibuya-ku',
    'addressRegion': 'Tokyo',
    'postalCode': '150-0043',
    'streetAddress': '1-10-8 #2F-C'
  },
}

export const topPageBreadcrumbListJsonLdData = {
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'item': {
        '@id': process.env.FRONTEND_URL,
        'name': 'トップページ'
      }
    },
  ]
}

export const wellnessLpBreadcrumbListJsonLdData = {
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'item': {
        '@id': process.env.FRONTEND_URL,
        'name': 'トップページ'
      }
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'item': {
        '@id': `${process.env.FRONTEND_URL}/lp/wellness`,
        'name': 'ウェルネスサービス提供者向けページ'
      }
    },
  ]
}

export const beautyLpBreadcrumbListJsonLdData = {
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'item': {
        '@id': process.env.FRONTEND_URL,
        'name': 'トップページ'
      }
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'item': {
        '@id': `${process.env.FRONTEND_URL}/lp/beauty`,
        'name': '美容サービス提供者向けページ'
      }
    },
  ]
}

export const eventLpBreadcrumbListJsonLdData = {
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'item': {
        '@id': process.env.FRONTEND_URL,
        'name': 'トップページ'
      }
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'item': {
        '@id': `${process.env.FRONTEND_URL}/lp/event`,
        'name': 'イベント・セミナー・体験会サービス提供者向けページ'
      }
    },
  ]
}

export const companyInfoPageBreadcrumbListJsonLdData = {
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'item': {
        '@id': process.env.FRONTEND_URL,
        'name': 'トップページ'
      }
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'item': {
        '@id': `${process.env.FRONTEND_URL}/company_info`,
        'name': '企業ページ'
      }
    },
  ]
}

