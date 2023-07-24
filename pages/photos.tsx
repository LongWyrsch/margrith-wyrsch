import Gallery from '@/components/Gallery'
import React, { useState } from 'react'

const Photos = () => {
	const [isLoaded, setIsLoaded] = useState(false) // This is only used for "drawings.tsx" in order to time the display of section headers.

	const folderId = process.env.NEXT_PUBLIC_PHOTOS_FOLDER_ID as string
	const sheetName = 'Photos'

	return (
		<div>
			<Gallery folderId={folderId} sheetName={sheetName} isLoaded={setIsLoaded} />
		</div>
	)
}

export default Photos
