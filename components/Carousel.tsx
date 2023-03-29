import { ImageData } from '@/commonTypes'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './Carousel.module.css'
import { Icon } from '@iconify-icon/react'
import { TailSpin } from  'react-loader-spinner'

type CarouselProps = {
	focusedImageIndex: number
	setFocusedImageIndex: React.Dispatch<React.SetStateAction<number | null>>
	images: ImageData[]
}

const Carousel = ({ focusedImageIndex, setFocusedImageIndex, images }: CarouselProps) => {
	const [imageLoaded, setimageLoaded] = useState(false)

	const date = images[focusedImageIndex].date
	const name = images[focusedImageIndex].artName
	const description = images[focusedImageIndex].description
	const dimensions = images[focusedImageIndex].dimensions
	const medium = images[focusedImageIndex].medium
	const material = images[focusedImageIndex].material
	const technique = images[focusedImageIndex].technique

	const imageId = images[focusedImageIndex].fileMetadata.id
	const thumbnailLink = images[focusedImageIndex].fileMetadata.thumbnailLink

	const handleOnLoad = () => {
		setimageLoaded(true)
	}

	const handleLeftClick = () => {
		setFocusedImageIndex((prev) => {
			setimageLoaded(false)
			if (prev) {
				if (prev > 0) {
					return prev - 1
				} else {
					return images.length - 1
				}
			} else {
				return null
			}
		})
	}

	const handleRightClick = () => {
		setFocusedImageIndex((prev) => {
			setimageLoaded(false)
			if (prev) {
				if (prev < images.length - 1) {
					return prev + 1
				} else {
					return 0
				}
			} else {
				return null
			}
		})
	}

	return (
		<div className={styles.carouselContainer}>
			<div className={styles.leftArrow} onClick={handleLeftClick}>
				<Icon icon="mdi:arrow-left-circle" width={70} />
			</div>
			<div className={styles.rightArrow} onClick={handleRightClick}>
				<Icon icon="mdi:arrow-right-circle" width={70} />
			</div>
			<div className={styles.close} onClick={() => setFocusedImageIndex(null)}>
				<Icon icon="material-symbols:close-rounded" width={60} />
			</div>
			<div className={styles.imageContainer}>
				<Image
					className={styles.image}
					src={`https://drive.google.com/uc?export=view&id=${imageId}`}
					alt={name}
					// placeholder="blur"
					// blurDataURL={thumbnailLink}
					quality="0.5"
					onLoad={handleOnLoad}
					width="0"
					height="0"
					sizes="70vw"
				/>
				{!imageLoaded && (
					<TailSpin
					height="80"
					width="80"
					color="white"
					ariaLabel="tail-spin-loading"
					radius="1"
					wrapperStyle={{}}
					wrapperClass={styles.spinner}
					visible={true}
				  />
				)}
			</div>
			<div className={styles.details}>
				<p className={styles.name}>{name}</p>
				<p>{date}</p>
				<p>{dimensions}</p>
				<p>{medium}</p>
				<p>{material}</p>
				<p>{technique}</p>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default Carousel

// try {
// 	new Promise((resolve) => {
// 		const loadedImage = new window.Image()
// 		loadedImage.src = `https://drive.google.com/uc?export=view&id=${imageId}`
// 		loadedImage.onload = () => {
// 			setimageLoaded(true)
// 			resolve(loadedImage)
// 		}
// 		loadedImage.onerror = (err) => {
// 			throw err
// 		}
// 	})
// } catch (error) {
// 	console.log('Failed to load image', error)
// }
