import { ImageData } from '@/commonTypes'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Gallery.module.css'
import { TailSpin } from 'react-loader-spinner'
import { fetchImageData } from '@/utlis/fetchArtData'
import Carousel from './Carousel'

type GalleryProps = {
	folderId: string
	sheetName: string
	isLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const Gallery = ({ folderId, sheetName, isLoaded }: GalleryProps) => {
	const [images, setImages] = useState<ImageData[]>([])
	const [focusedImageIndex, setFocusedImageIndex] = useState<number | null>(null) // Trigger and set carousel target image
	const loadedImageCountRef = useRef(0) // Keep track of how many images were loaded
	const [allImagesLoaded, setAllImagesLoaded] = useState(false) // Display images only once ALL images are loaded

	// Fetch image thumbnail using Google clound app registration API key. The thumbnails url changes every few hours/days, so getStaticProps() is not possible.
	useEffect(() => { 
		const fetchImages = async () => {
			setImages(await fetchImageData(folderId, sheetName))
		}
		fetchImages()
	 }, [])

	// Show carousel on click
	const handleOnClick = (imageId: string) => {
		const index = images.findIndex((image) => image.fileMetadata.id === imageId)
		if (index > -1) setFocusedImageIndex(index)
	}

	// Show images once they are all loaded.
	const handleOnLoad = (id: string) => {
		// Detect which image loaded and add a class to it
			// const img = document.getElementById(id)
			// img?.classList.add(styles.loaded)

		loadedImageCountRef.current++
		if (loadedImageCountRef.current === images.length){
			setAllImagesLoaded(true)
			isLoaded(true)
		}
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
						unoptimized // Without this, Next.js will optimize each photo, which will result in exceeding the image optimization quota for free Vercel accounts.
						// loading="lazy" // No point in loading "lazy" since they all show once ALL are loaded.
						width={0}
						height={0}
					/>
					{/* <div>{image.date}</div> */}
				</div>
			))}
			<div className={styles.endBuffer}></div>
			{focusedImageIndex !== null && focusedImageIndex >= 0 && <Carousel focusedImageIndex={focusedImageIndex} setFocusedImageIndex={setFocusedImageIndex} images={images} />}
		</div>
	)
}

export default Gallery