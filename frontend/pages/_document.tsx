import { Html, Head, Main, NextScript } from 'next/document'

const MyDocument = () => {
  const url = process.env.gybuilder_FRONTEND_URL
  const title = 'gybuilder'
  const description = 'gybuilder'

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
        <meta property='og:image' content={`${url}/ogp.png`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='format-detection' content='telephone=no' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <script src="https://js.stripe.com/v3/"></script>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
