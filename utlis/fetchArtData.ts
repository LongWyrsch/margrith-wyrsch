import { FileData, ImageData, SheetData } from '@/commonTypes'

export const fetchImageData = async (folderId: string, sheetName: string) => {
	const apiKey = process.env.NEXT_PUBLIC_API_KEY as string
	const spredsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID as string

	const fetchSheetData = async () => {
		try {
			const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spredsheetId}/values/${sheetName}?key=${apiKey}`)
			const JSON = await response.json()
			const table = JSON.values as [string, string, string, string, string, string, string, string][]
            const headers = ['fileName', 'date', 'artName', 'description', 'dimensions', 'medium', 'material', 'technique']
            let data: {}[] = []
            table.slice(1).forEach((row, i) => {
                let tempObject = {} 
                row.forEach((value, j) => {
                    const field = headers[j]
                    tempObject = {...tempObject, [field]: value}
                });
                data.push(tempObject)
            })

            return data as SheetData[]
        } catch (error) {
            console.error('Error fetching spreadsheet data:', error)
        }
	}

	const fetchFileData = async () => {
		try {
			const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id%2Cname%2CwebContentLink%2CmimeType%2CthumbnailLink)&key=${apiKey}`)
			const JSON = await response.json()
			const data = JSON.files
			return data as FileData[]
		} catch (error) {
			console.error('Error fetching images:', error)
		}
	}

	const sheetData = await fetchSheetData()
	const fileData = await fetchFileData()


	const imageData: ImageData[] = []

	if (sheetData && fileData) {
		sheetData.forEach((row) => {
			const fileName = row.fileName
			const imageIndex = fileData.findIndex((imageMetadata) => imageMetadata.name === fileName)
			if (imageIndex > -1) {
				imageData.push({...row, fileMetadata: fileData[imageIndex]})
			}
		})
	}

	const compareSort = (a: ImageData, b: ImageData) => {
		const date1 = new Date(a.date).getTime()
		const date2 = new Date(b.date).getTime()

		return date1 - date2
	}

	imageData.sort(compareSort)

	return imageData
}
