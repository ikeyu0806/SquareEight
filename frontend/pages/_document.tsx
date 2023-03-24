import { Html, Head, Main, NextScript } from 'next/document'
import parse from 'html-react-parser'

const MyDocument = () => {
  const url = process.env.square_eight_FRONTEND_URL
  const title = 'square_eight'
  const description = 'オンラインショップ開設、予約システム、回数券発行、サブスクリプション支払い対応、オンラインアンケート機能、顧客管理をオールインワンで提供。'

  return (
    <Html lang='ja-JP'>
      <Head>
        <meta charSet='utf-8' />
        <meta name='description' content={description} />
        <meta name='theme-color' content='#333' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:url' content={url} />
        <meta property='og:description' content={description} />
        <meta property='og:site_name' content={title} />
        <meta property='og:image' content='/images/square_eight_top_image.webp' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='format-detection' content='telephone=no' />
        <link rel='icon' href='/favicons/s-alphabet-icon.svg' />
        <script src='https://js.stripe.com/v3/'></script>
        <script src='https://apis.google.com/js/platform.js' async defer></script>
        {parse('<script async src="https://www.googletagmanager.com/gtag/js?id=G-HNQ6QMTVJ7"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "G-HNQ6QMTVJ7");</script>')}
      </Head>
      <body className='system-font-family'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
