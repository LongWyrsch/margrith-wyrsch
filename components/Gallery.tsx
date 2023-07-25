import { FileData, ImageData } from '@/commonTypes'
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
	 // eslint-disable-next-line react-hooks/exhaustive-deps
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
	
	
	// Some image thumbnails are so small that they apprear blurry. Use actual image instead.
	const returnThumbnailOrFullImage = (image: ImageData) => {
		// The following methods removes special accents: .normalize("NFD").replace(/\p{Diacritic}/gu, "")
		const largeImages = [
			"Gussi, 2023, Gravé sur Tetra Pak, Engraved on Tetra Pak, 3,7 cm x 19,5 cm.jpeg".normalize("NFD").replace(/\p{Diacritic}/gu, ""),
			"Bambou, 2023, Gravé sur Tetra Pak, Engraved on Tetra Pak, 9,3 cm x 19,5 cm.jpeg".normalize("NFD").replace(/\p{Diacritic}/gu, ""),
			"Escalier : Stairs, 2023, Gravé sur Tetra Pak, Engraved on Tetra Pak, 5,5 cm x 16 cm.jpeg".normalize("NFD").replace(/\p{Diacritic}/gu, "")
		]

		let imageUrl
		if (largeImages.includes(image.fileMetadata.name.normalize("NFD").replace(/\p{Diacritic}/gu, "")))
			imageUrl = `https://drive.google.com/uc?export=view&id=${image.fileMetadata.id}`
		else
			imageUrl = image.fileMetadata.thumbnailLink

		return imageUrl
	}
	 
	return (
		<div className={styles.gallery}>
			{!allImagesLoaded && <TailSpin height="80" width="80" color="white" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass={styles.spinner} visible={true} />}
			{images.map((image) => (
				<div key={image.fileMetadata.id} className={styles.imageContainer}>
					<Image
						className={`${styles.image}  ${visibility}`}
						src={returnThumbnailOrFullImage(image)}
						alt={image.FR?.artName || 'Art piece'}
						onClick={() => handleOnClick(image.fileMetadata.id)}
						onLoad={() => handleOnLoad(image.fileMetadata.id)}
						unoptimized // Without this, Next.js will optimize each photo, which will result in exceeding the image optimization quota for free Vercel accounts.
						// loading="lazy" // No point in loading "lazy" since they all show once ALL are loaded.
						// fill={true}
						height={200}
						width={0}	

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