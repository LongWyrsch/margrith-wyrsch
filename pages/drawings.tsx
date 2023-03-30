import { ImageData } from '@/commonTypes'
import Carousel from '@/components/Carousel'
import Gallery from '@/components/Gallery'
import { fetchImageData } from '@/utlis/fetchArtData'
import React, { useEffect, useState } from 'react'

type DrawingsProps = {
	images: ImageData[]
}

const Drawings = ({ images }: DrawingsProps) => {
	const [focusedImageIndex, setFocusedImageIndex] = useState<number | null>(null)

	const handleOnClick = (imageId: string) => {
		const index = images.findIndex((image) => image.fileMetadata.id === imageId)
		if (index > -1) setFocusedImageIndex(index)
	}


	return (
		<div>
			{images && images.length > 0 && <Gallery images={images} handleOnClick={handleOnClick} />}
			{focusedImageIndex !== null && focusedImageIndex >= 0 && <Carousel focusedImageIndex={focusedImageIndex} setFocusedImageIndex={setFocusedImageIndex} images={images} />}
		</div>
	)
}

export default Drawings

export async function getStaticProps() {
	const folderId = process.env.NEXT_PUBLIC_DESSINS_FOLDER_ID as string
	const sheetName = 'Dessins'

	const images = await fetchImageData(folderId, sheetName)

	return {
		props: {
			images,
		},
	}
}
