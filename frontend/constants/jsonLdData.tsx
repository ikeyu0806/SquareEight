export const defaultJsonLdData = {
  '@context': 'http://schema.org/',
  '@type': 'Product',
  'name': 'SquareEight',
  'description': 'オンラインショップ開設、予約システム、回数券発行、サブスクリプション支払い対応、オンラインアンケート機能、顧客管理をオールインワンで提供。',
}

export const corporationJsonLdData = {
  '@context': 'http://schema.org/',
  '@type': 'Organization',
  'name': 'SquareEight',
  'description': 'クラウドサービスSquareEightの運営会社',
  'url': 'https://square-eight.net/',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Shibuya-ku',
    'addressRegion': 'Tokyo',
    'postalCode': '150-0043',
    'streetAddress': '1-10-8 #2F-C'
  },
}

export const topPageBreadcrumbList = {
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'item': {
        '@id': 'https://square-eight.net/',
        'name': 'トップページ'
      }
    },
  ]
}
