import { Dispatch, SetStateAction } from "react"

export type SheetData = {
	fileName: string
	date: string
	artName: string
	description: string
	dimensions: string
	medium: string
	material: string
	technique: string, 
}

export type FileData = {
	id: string
	name: string
	webContentLink: string
	mimeType: string
	thumbnailLink: string
}



export type ImageData = SheetData & {fileMetadata: FileData}


export type LanguageContextType = {
	language: "FR" | "EN" 
	setLanguage: Dispatch<SetStateAction<"FR" | "EN">>
}