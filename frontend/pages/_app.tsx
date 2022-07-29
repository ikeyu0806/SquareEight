import { Provider } from 'react-redux'
import { store } from '../redux/store'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
MyApp.getInitialProps = async () => ({ pageProps: {} })
export default MyApp
