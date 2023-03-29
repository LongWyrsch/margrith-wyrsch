import { ImageData } from '@/commonTypes'
import Carousel from '@/components/Carousel'
import Gallery from '@/components/Gallery'
import { fetchImageData } from '@/utlis/fetchArtData'
import React, { useEffect, useState } from 'react'

type PaintingsProps = {
	images: ImageData[]
}

const Paintings = ({ images }: PaintingsProps) => {
	const [focusedImageIndex, setFocusedImageIndex] = useState<number | null>(null)

	const handleOnClick = (imageId: string) => {
		const index = images.findIndex((image) => image.fileMetadata.id === imageId)
		setFocusedImageIndex(index)
	}

	return (
		<div>
			{images && images.length > 0 && <Gallery images={images} handleOnClick={handleOnClick} />}
			{focusedImageIndex && <Carousel focusedImageIndex={focusedImageIndex} setFocusedImageIndex={setFocusedImageIndex} images={images} />}
		</div>
	)
}

export default Paintings

export async function getStaticProps() {
	const folderId = process.env.NEXT_PUBLIC_PEINTURES_FOLDER_ID as string
	const sheetName = "Peintures"

	const images = await fetchImageData(folderId, sheetName)

	return {
		props: {
			images
		},
	}
}
