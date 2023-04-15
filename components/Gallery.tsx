import { ImageData } from '@/commonTypes'
import Image from 'next/image'
import React, { lazy, useEffect, useRef, useState } from 'react'
import styles from './Gallery.module.css'
import { TailSpin } from 'react-loader-spinner'


type GalleryProps = {
	images: ImageData[]
	handleOnClick: (imageId: string) => void
}

const Gallery = ({ images, handleOnClick }: GalleryProps) => {
	const [allImagesLoaded, setAllImagesLoaded] = useState(false)
	const loadedImageCountRef = useRef(0)

	const handleOnLoad = (id: string) => {
		// Detect which image loaded and add a class to it
			// const img = document.getElementById(id)
			// img?.classList.add(styles.loaded)

		loadedImageCountRef.current++
		if (loadedImageCountRef.current === images.length) setAllImagesLoaded(true)
	}

	const visibility = allImagesLoaded ? styles.show : styles.hide

	return (
		<div className={styles.gallery}>
			{!allImagesLoaded && <TailSpin height="80" width="80" color="white" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass={styles.spinner} visible={true} />}
			{images.map((image) => (
				<div key={image.fileMetadata.id}>
					<Image
						className={`${styles.image}  ${visibility}`}
						src={image.fileMetadata.thumbnailLink}
						alt={image.FR?.artName || 'Art piece'}
						onClick={() => handleOnClick(image.fileMetadata.id)}
						onLoad={() => handleOnLoad(image.fileMetadata.id)}
						width="0"
						height="0"
						sizes="33vw"
						// loading="lazy"
					/>
					{/* <div>{image.date}</div> */}
				</div>
			))}
			<div className={styles.endBuffer}></div>
		</div>
	)
}

export default Gallery
