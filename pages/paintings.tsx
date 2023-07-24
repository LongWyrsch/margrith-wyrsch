import Gallery from '@/components/Gallery'
import React, { useState } from 'react'

const Paintings = () => {
	const [isLoaded, setIsLoaded] = useState(false) // This is only used for "drawings.tsx" in order to time the display of section headers.
	
	const folderId = process.env.NEXT_PUBLIC_PEINTURES_FOLDER_ID as string
	const sheetName = 'Peintures'

	return (
		<div>
			<Gallery folderId={folderId} sheetName={sheetName} isLoaded={setIsLoaded}/>
		</div>
	)
}

export default Paintings
