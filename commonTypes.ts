import { Dispatch, SetStateAction } from 'react'

export type SheetData = {
	FR: {
		fileName: string | null
		date: string | null
		dimensions: string | null
		artName: string | null
		description: string | null
		medium: string | null
		material: string | null
		technique: string | null
	}
	EN: {
		fileName: string | null
		date: string | null
		dimensions: string | null
		artName: string | null
		description: string | null
		medium: string | null
		material: string | null
		technique: string | null
	}
}

export type FileData = {
	id: string
	name: string
	webContentLink: string
	mimeType: string
	thumbnailLink: string
}

export type ImageData = SheetData & { fileMetadata: FileData }

export type LanguageContextType = {
	language: 'FR' | 'EN'
	setLanguage: Dispatch<SetStateAction<'FR' | 'EN'>>
}
