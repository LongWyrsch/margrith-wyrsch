import { ImageData } from '@/commonTypes'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import styles from './Carousel.module.css'
import { Icon } from '@iconify-icon/react'
import { TailSpin } from 'react-loader-spinner'
import { LanguageContext } from '@/pages/_app'
import { useRouter } from 'next/router'

type CarouselProps = {
	focusedImageIndex: number
	setFocusedImageIndex: React.Dispatch<React.SetStateAction<number | null>>
	images: ImageData[]
}

const Carousel = ({ focusedImageIndex, setFocusedImageIndex, images }: CarouselProps) => {
	const { language, setLanguage } = useContext(LanguageContext)

	const route = useRouter()
	const isPhotoPage = route.pathname === '/photos' ? true : false

	const [imageLoaded, setimageLoaded] = useState(false)

	const date = images[focusedImageIndex][language]?.date
	const name = images[focusedImageIndex][language]?.artName
	const description = images[focusedImageIndex][language]?.description
	const dimensions = images[focusedImageIndex][language]?.dimensions
	const medium = images[focusedImageIndex][language]?.medium

	const imageId = images[focusedImageIndex].fileMetadata.id
	const thumbnailLink = images[focusedImageIndex].fileMetadata.thumbnailLink

	const handleOnLoad = () => {
		setimageLoaded(true)
	}

	const handleLeftClick = () => {
		setimageLoaded(false)
		setFocusedImageIndex((prev) => {
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
		setimageLoaded(false)
		setFocusedImageIndex((prev) => {
			if (prev || prev === 0) {
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

	// !imageLoaded && console.log('not loaded')
	// imageLoaded && console.log('loaded')

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
					alt={name || 'Art piece'}
					// placeholder="blur"
					// blurDataURL={thumbnailLink}
					// quality="0.5"
					onLoad={handleOnLoad}
					width="0"
					height="0"
					sizes="70vw"
					unoptimized // Without this, Next.js will have an error when trying to fetch optimized image
				/>
				{!imageLoaded && <TailSpin height="80" width="80" color="white" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass={styles.spinner} visible={true} />}
			</div>
			{!isPhotoPage && <div className={styles.details}>
				<p className={styles.name}>{name}</p>
				<div className={styles.metadata}>
					<p>{date}</p>-
					<p>{medium}</p>-
					<p>{dimensions}</p>
				</div>
				<p>{description}</p>
			</div>}
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
