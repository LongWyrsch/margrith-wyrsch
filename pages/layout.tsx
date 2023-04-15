import Navbar from '@/components/Navbar'
import { Icon } from '@iconify-icon/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import styles from './layout.module.css'

interface Props {
	children: ReactNode
}

function Layout({ children }: Props) {
	const route = useRouter()
	const visibility = route.pathname === '/' ? styles.show : styles.hide

	return (
		<div>
			<Navbar />
			<div className={`${styles.heroContainer} ${visibility}`}>
				<div className={styles.maggy}>Margrith Wyrsch</div>
				<Image className={styles.heroImage} src="/Hero Banner.jpeg" alt="hero image" fill />
			</div>

			{children}
		</div>
	)
}

export default Layout
