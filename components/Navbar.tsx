import { LanguageContextType } from '@/commonTypes'
import { LanguageContext } from '@/pages/_app'
import { Icon } from '@iconify-icon/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
	const route = useRouter()
	// const {language, setLanguage} = useContext(LanguageContext) as LanguageContextType;

	const positionClass = route.pathname === '/' ? styles.low : styles.top

	const copyContent = async () => {
		try {
			await navigator.clipboard.writeText('wyrsch.m@gmail.com')
			console.log('Content copied to clipboard')
		} catch (err) {
			console.error('Failed to copy: ', err)
		}
	}

	const activeClass = (path: string) => { 
		return route.pathname===path ? styles.active : ''
	}

	return (
		<nav className={styles.navbar}>
			<div className={`${positionClass} ${styles.movingElements}`}>
				<div className={styles.navLinks}>
					<Link className={activeClass('/')} href="/">Home</Link>
					<Link className={activeClass('/paintings')} href="/paintings">Paintings</Link>
					<Link className={activeClass('/photos')} href="/photos">Photos</Link>
					<Link className={activeClass('/drawings')} href="/drawings">Drawings</Link>
					<Link className={activeClass('/gravures')} href="/gravures">Gravures</Link>
					<Link className={activeClass('/testimonies')} href="/testimonies">Testimonies</Link>
					<Link className={activeClass('/about')} href="/about">About</Link>
				</div>
				<div className={`${styles.contactLinks}`}>
					<div className={styles.gmail} onClick={copyContent}>
						<Icon icon="mdi:gmail" width={40} />
						<div className={styles.gmailTooltip}>
							wyrsch.m@gmail.com
							<br />
							(Click to copy)
						</div>
					</div>
					<Link className={styles.facebook} href="https://www.facebook.com/people/Margrith-Wyrsch-sur-toile/100063294335389/?locale=fr_FR">
						<Icon icon="ic:baseline-facebook" width={40} />
					</Link>
				</div>
			</div>
			<div className={styles.languages}>
				<div onClick={() => { setLanguage('FR') }}>FR</div>
				<div onClick={() => { setLanguage('EN') }}>EN</div>
			</div>
		</nav>
	)
}

export default Navbar
