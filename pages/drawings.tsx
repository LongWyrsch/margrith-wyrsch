import { ImageData } from '@/commonTypes'
import Carousel from '@/components/Carousel'
import Gallery from '@/components/Gallery'
import { fetchImageData } from '@/utlis/fetchArtData'
import React, { useEffect, useState } from 'react'

type DrawingsProps = {
	imagesAgenda: ImageData[]
	imagesPaysages: ImageData[]
	imagesNatureMorte: ImageData[]
	imagesPapierEtSculptures: ImageData[]
}

const Drawings = ({ imagesAgenda, imagesPaysages, imagesNatureMorte, imagesPapierEtSculptures }: DrawingsProps) => {
	const [images, setImages] = useState<ImageData[] | null>(null)
	const [focusedImageIndex, setFocusedImageIndex] = useState<number | null>(null)

	const handleOnClickAgenda = (imageId: string) => {
		const index = imagesAgenda.findIndex((image) => image.fileMetadata.id === imageId)
		if (index > -1) {
			setFocusedImageIndex(index)
			setImages(imagesAgenda)
		}
	}
	const handleOnClickPaysages = (imageId: string) => {
		const index = imagesPaysages.findIndex((image) => image.fileMetadata.id === imageId)
		if (index > -1) {
			setFocusedImageIndex(index)
			setImages(imagesPaysages)
		}
	}
	const handleOnClickNatureMorte = (imageId: string) => {
		const index = imagesNatureMorte.findIndex((image) => image.fileMetadata.id === imageId)
		if (index > -1) {
			setFocusedImageIndex(index)
			setImages(imagesNatureMorte)
		}
	}
	const handleOnClickPapierEtSculptures = (imageId: string) => {
		const index = imagesPapierEtSculptures.findIndex((image) => image.fileMetadata.id === imageId)
		if (index > -1) {
			setFocusedImageIndex(index)
			setImages(imagesPapierEtSculptures)
		}
	}


	return (
		<div>
			<div style={{textAlign: "center", fontSize: "3rem", marginTop: '1rem'}}>Dessins Agenda</div>
			{imagesAgenda && imagesAgenda.length > 0 && <Gallery images={imagesAgenda} handleOnClick={handleOnClickAgenda} />}
			<div style={{textAlign: "center", fontSize: "3rem", marginTop: '1rem'}}>Dessins Paysages</div>
			{imagesPaysages && imagesPaysages.length > 0 && <Gallery images={imagesPaysages} handleOnClick={handleOnClickPaysages} />}
			<div style={{textAlign: "center", fontSize: "3rem", marginTop: '1rem'}}>Dessins Nature Morte</div>
			{imagesNatureMorte && imagesNatureMorte.length > 0 && <Gallery images={imagesNatureMorte} handleOnClick={handleOnClickNatureMorte} />}
			<div style={{textAlign: "center", fontSize: "3rem", marginTop: '1rem'}}>Dessins sur Papier Noir et Sculptures</div>
			{imagesPapierEtSculptures && imagesPapierEtSculptures.length > 0 && <Gallery images={imagesPapierEtSculptures} handleOnClick={handleOnClickPapierEtSculptures} />}
			{focusedImageIndex !== null && focusedImageIndex >= 0 && images != null && <Carousel focusedImageIndex={focusedImageIndex} setFocusedImageIndex={setFocusedImageIndex} images={images} />}
		</div>
	)
}

export default Drawings

export async function getServerSideProps() {
	const folderIdAgenda = process.env.NEXT_PUBLIC_AGENDA_FOLDER_ID as string
	const folderIdNatureMorte = process.env.NEXT_PUBLIC_NATUREMORTE_FOLDER_ID as string
	const folderIdPaysages = process.env.NEXT_PUBLIC_PAYSAGES_FOLDER_ID as string
	const folderIdPapierEtSculptures = process.env.NEXT_PUBLIC_PAPIERNOIRSCULPTURES_FOLDER_ID as string
	const agenda = 'Dessins Agenda'
	const paysages = 'Dessins Paysages'
	const natureMorte = 'Dessins Nature Morte'
	const papierEtSculptures = 'Dessins sur Papier Noir et Sculptures'

	const imagesAgenda = await fetchImageData(folderIdAgenda, agenda)
	const imagesPaysages = await fetchImageData(folderIdPaysages, paysages)
	const imagesNatureMorte = await fetchImageData(folderIdNatureMorte, natureMorte)
	const imagesPapierEtSculptures = await fetchImageData(folderIdPapierEtSculptures, papierEtSculptures)

	return {
		props: {
			imagesAgenda,
			imagesPaysages,
			imagesNatureMorte,
			imagesPapierEtSculptures
		},
	}
}
