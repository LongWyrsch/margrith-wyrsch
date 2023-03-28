import React, { useEffect, useState } from 'react'

interface File {
	id: string
	name: string
	webContentLink: string
}

const Photos = () => {
	const [files, setFiles] = useState<File[]>([])

	const apiKey = process.env.NEXT_PUBLIC_API_KEY 
	const folderId = process.env.NEXT_PUBLIC_FOLDER_ID

	const loadFiles = async () => {
		const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`

		try {
			const response = await fetch(url)
			const data = await response.json()
			setFiles(data.files)
		} catch (error) {
			console.error('Error fetching files:', error)
		}
	}

    useEffect(() => { 
        loadFiles()
     }, [])

	return (
		<div>
			<ul>
				{files.map((file) => (
					<li key={file.id}>
						<a href={file.webContentLink} target="_blank" rel="noopener noreferrer">
							{file.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Photos
