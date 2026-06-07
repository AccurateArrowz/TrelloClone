import React from 'react'

type ImageProps ={ 
  src: string
}
export default function Image({src}: ImageProps) {

  return (
    <img src={src} className='w-[300px] ' alt="image" />
  )
}
