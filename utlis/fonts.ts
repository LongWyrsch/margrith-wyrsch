import { Montserrat } from 'next/font/google'
import { Dancing_Script } from 'next/font/google'
import { Caveat } from 'next/font/google'
import { Marck_Script } from 'next/font/google'
import { Poiret_One } from 'next/font/google'
export const montserrat = Montserrat({
	subsets: ['latin'],
})
export const dancingScript = Dancing_Script({
	subsets: ['latin'],
})
export const caveat = Caveat({
	subsets: ['latin'],
})
export const marckScript = Marck_Script({
	subsets: ['latin'],
	weight: '400'
})
export const poiretOne = Poiret_One({
	subsets: ['latin'],
	weight: '400'
})