import { ImageData } from '@/commonTypes'
import Gallery from '@/components/Gallery'
import React, { useState } from 'react'

type DrawingsProps = {
	imagesAgenda: ImageData[]
	imagesPaysages: ImageData[]
	imagesNatureMorte: ImageData[]
	imagesPapierEtSculptures: ImageData[]
}

const Drawings = ({ imagesAgenda, imagesPaysages, imagesNatureMorte, imagesPapierEtSculptures }: DrawingsProps) => {
	// First, detect if all section images are loaded, then show the section header. 
	const [agendaLoaded, setAgendaLoaded] = useState(false)
	const [paysagesLoaded, setPaysagesLoaded] = useState(false)
	const [natureMorteLoaded, setNatureMorteLoaded] = useState(false)
	const [papierEtSculpturesLoaded, setPapierEtSculpturesLoaded] = useState(false)

	const folderIdAgenda = process.env.NEXT_PUBLIC_AGENDA_FOLDER_ID as string
	const folderIdNatureMorte = process.env.NEXT_PUBLIC_NATUREMORTE_FOLDER_ID as string
	const folderIdPaysages = process.env.NEXT_PUBLIC_PAYSAGES_FOLDER_ID as string
	const folderIdPapierEtSculptures = process.env.NEXT_PUBLIC_PAPIERNOIRSCULPTURES_FOLDER_ID as string
	const agenda = 'Dessins Agenda'
	const paysages = 'Dessins Paysages'
	const natureMorte = 'Dessins Nature Morte'
	const papierEtSculptures = 'Dessins sur Papier Noir et Sculptures'

	return (
		<div>
			{agendaLoaded && <div style={{ textAlign: 'center', fontSize: '3rem', marginTop: '3rem' }}>Dessins Agenda</div>}
			<Gallery folderId={folderIdAgenda} sheetName={agenda} isLoaded={setAgendaLoaded}/>
			{paysagesLoaded && <div style={{ textAlign: 'center', fontSize: '3rem', marginTop: '1rem' }}>Dessins Paysages</div>}
			<Gallery folderId={folderIdNatureMorte} sheetName={paysages} isLoaded={setPaysagesLoaded}/>
			{natureMorteLoaded && <div style={{ textAlign: 'center', fontSize: '3rem', marginTop: '1rem' }}>Dessins Nature Morte</div>}
			<Gallery folderId={folderIdPaysages} sheetName={natureMorte} isLoaded={setNatureMorteLoaded}/>
			{papierEtSculpturesLoaded && <div style={{ textAlign: 'center', fontSize: '3rem', marginTop: '1rem' }}>Dessins sur Papier Noir et Sculptures</div>}
			<Gallery folderId={folderIdPapierEtSculptures} sheetName={papierEtSculptures} isLoaded={setPapierEtSculpturesLoaded}/>
		</div>
	)
}

export default Drawings
