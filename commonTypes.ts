import { Dispatch, SetStateAction } from 'react'

export type SheetData = {
	FR: {
		fileName: string | null
		date: string | null
		dimensions: string | null
		artName: string | null
		description: string | null
		medium: string | null
	}
	EN: {
		fileName: string | null
		date: string | null
		dimensions: string | null
		artName: string | null
		description: string | null
		medium: string | null
	}
}

export type FileData = {
	id: string
	name: string
	webContentLink: string
	mimeType: string
	thumbnailLink: string
}

export type ImageData = { 
	FR?: {
		fileName: string | null
		date: string | null
		dimensions: string | null
		artName: string | null
		description: string | null
		medium: string | null
	}
	EN?: {
		fileName: string | null
		date: string | null
		dimensions: string | null
		artName: string | null
		description: string | null
		medium: string | null
	}
	fileMetadata: FileData 
}

export type LanguageContextType = {
	language: 'FR' | 'EN'
	setLanguage: Dispatch<SetStateAction<'FR' | 'EN'>>
}
