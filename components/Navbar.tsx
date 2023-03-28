import { Icon } from '@iconify-icon/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
	const route = useRouter()

	const positionClass = route.pathname === '/' ? styles.low : styles.top

	return (
		<nav className={styles.navbar}>
			<div className={`${positionClass} ${styles.movingElements}`}>
				<div className={styles.navLinks}>
					<Link href="/">Home</Link>
					<Link href="/paintings">Paintings</Link>
					<Link href="/photos">Photos</Link>
					<Link href="/drawings">Drawings</Link>
					<Link href="/gravures">Gravures</Link>
					<Link href="/testimonies">Testimonies</Link>
					<Link href="/about">About</Link>
				</div>
				<div className={`${styles.contactLinks}`}>
					<button>
						<Icon icon="mdi:gmail" width={50} />
					</button>
					<button>
						<Icon icon="ic:baseline-facebook" width={50} />
					</button>
				</div>
			</div>
			<div className={styles.languages}>
				<button>FR</button>
				<button>EN</button>
			</div>
		</nav>
	)
}

export default Navbar
