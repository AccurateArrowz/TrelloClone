import React, { useEffect, useState } from 'react'

type AvaialableRoomType = {
    [k: string]: number
}

type Hotel={
    name: string,
    description: string,
    availableRoomTypes: AvaialableRoomType
}
type HotelDetailsProps = {
    id: string;
}
export default function HotelDetails({ id }: HotelDetailsProps) {
    const [hotel, setHotel]= useState<Hotel | null>(null);
    const checkIn = '2026-06-04';
    const checkOut = '2026-06-05';
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        const fetchHotel = async ()=> {
            try{
                const params = new URLSearchParams({
                    hotelId: id,
                });

                if (checkIn) params.set('checkIn', checkIn);
                if (checkOut) params.set('checkOut', checkOut);
                setLoading(true);
                const res = await fetch(
                    `http://localhost:3001/api/hotels/${id}?${params.toString()}`
                );
                const data: Hotel[] = await res.json();
                setHotel(data[0]);
                setLoading(false);
            }catch(error){
                // setError(error);
                setLoading(false);
                setError(error instanceof Error ? error.message : 'Something went wrong');
            }
        }
        fetchHotel();
    }, [id, checkIn, checkOut])
    if(error) return <p>{error}</p>
    else if(loading) return <p>Loading the hotel...</p>
  return (
    <div>
        {hotel && <h1>{hotel.name}</h1>}
    </div>
  )
}
