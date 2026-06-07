import React, { useState } from 'react'
import HotelCard from './HotelCard';

type Hotel = {
    id: string,
    name: string,
    primaryImg: string,
}
export default function HotelsList() {
    const [hotels, setHotels] = useState<Hotel[]>([]);

  return (
    <div>
        <h1>Hotels List</h1>
        {hotels && hotels.map(hotel => <HotelCard name={hotel.name} primaryImg={hotel.primaryImg}></HotelCard>)
}

    </div>
  )
}
