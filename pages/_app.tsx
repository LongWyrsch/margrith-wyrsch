import { LanguageContextType } from '@/commonTypes'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createContext, Dispatch, SetStateAction, useState } from 'react'
import Layout from './layout'

export const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType)

export default function App({ Component, pageProps }: AppProps) {
	const [language, setLanguage] = useState<'FR' | 'EN'>('FR')

	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			<Layout>
				<Head>
					<title>Margrith Wyrsch</title>
					<meta name="description" content="Margrith Wyrsch" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="" />
				</Head>
				<Component {...pageProps} />
			</Layout>
		</LanguageContext.Provider>
	)
}
