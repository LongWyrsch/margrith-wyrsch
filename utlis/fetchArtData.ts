import { FileData, ImageData, SheetData } from '@/commonTypes'

export const fetchImageData = async (folderId: string, sheetName: string) => {
	const apiKey = process.env.NEXT_PUBLIC_API_KEY as string
	const spredsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID as string

	const fetchSheetData = async () => {
		try {
			const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spredsheetId}/values/${sheetName}?key=${apiKey}`)
			const JSON = await response.json()
			const table = JSON.values as [string, string, string, string, string, string, string, string, string, string, string, string][]
			const headers = ['fileName', 'date', 'dimensions', 'artName', 'descriptionFR', 'mediumFR', 'descriptionEN', 'mediumEN']
			let data: {}[] = []
			table.slice(1).forEach((row, i) => {
				data.push({
					FR: {
						fileName: row[0] ? row[0] : null,
						date: row[1] ? row[1] : null,
						dimensions: row[2] ? row[2] : null,
						artName: row[3] ? row[3] : null,
						description: row[4] ? row[4] : null,
						medium: row[5] ? row[5] : null,
						material: row[6] ? row[6] : null,
						technique: row[7] ? row[7] : null,
					},
					EN: {
						fileName: row[0] ? row[0] : null,
						date: row[1] ? row[1] : null,
						dimensions: row[2] ? row[2] : null,
						artName: row[3] ? row[3] : null,
						description: row[8] ? row[8] : null,
						medium: row[9] ? row[9] : null,
						material: row[10] ? row[10] : null,
						technique: row[11] ? row[11] : null,
					},
				})
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
		fileData.forEach((file) => {
			const fileName = file.name
			const imageIndex = sheetData.findIndex((imageMetadata) => imageMetadata.FR.fileName === fileName)
			if (imageIndex > -1) {
				imageData.push({ ...sheetData[imageIndex], fileMetadata: file })
			} else {
				imageData.push({
					FR: { fileName: null, date: null, dimensions: null, artName: null, description: null, medium: null },
					EN: { fileName: null, date: null, dimensions: null, artName: null, description: null, medium: null },
					fileMetadata: file,
				})
			}
		})
	}

	const compareSort = (a: ImageData, b: ImageData) => {
		if (a.FR?.date && b.FR?.date) {
			const date1 = new Date(a.FR.date).getTime()
			const date2 = new Date(b.FR.date).getTime()
			return date2 - date1
		} else {
			return -1
		}
	}

	imageData.sort(compareSort)

	return imageData
}
