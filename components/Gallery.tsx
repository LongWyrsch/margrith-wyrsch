import Image from 'next/image'
import React from 'react'
import styles from './Gallery.module.css'

type GalleryProps = {
	images: string[]
}

const Gallery = ({ images }: GalleryProps) => {
	return (
		<div className={styles.gallery}>
			{images.map((image, i) => (
				// <Image key={i} className={styles.imageContainer} src={image} alt="Art piece" width="0" height="0" sizes="33vw" style={{ width: 'auto', height: '200px' }} />
				<Image key={i} className={styles.imageContainer} src='https://drive.google.com/uc?export=view&id=12cszpmjDXhbjTZR1R8k_5-CHyvRYlm5K' alt="Art piece" width="0" height="0" sizes="33vw" style={{ width: 'auto', height: '200px' }} />
			))}
		</div>
	)
}

export default Gallery
