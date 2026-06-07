import React from 'react'
import Image from './Image'

type HotelCardProps = {
    name: string,
    primaryImg: string,
}
export default function HotelCard({name, primaryImg}: HotelCardProps) {
  return (
    <div className='flex gap-6'>
    <Image src={primaryImg}></Image>
    <p>{hotel.name}</p>
    </div>
  )
}
