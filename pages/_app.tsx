import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from './layout'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Head>
				<title>Margrith Wyrsch</title>
				<meta name="description" content="Margrith Wyrsch" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="" />
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}
