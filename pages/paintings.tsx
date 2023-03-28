import Gallery from '@/components/Gallery'
import { mockImagePaths } from '@/mockData/mockImagePaths'
import React from 'react'

const paintings = () => {


  return (
    <div>
        <Gallery images={mockImagePaths} />
    </div>
  )
}

export default paintings