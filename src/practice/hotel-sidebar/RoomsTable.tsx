import React, { useState, useEffect } from 'react'
import type { RoomType } from './roomType.type';

type RoomsTableProps = {
  checkIn: string,
  checkOut: string,
}
export default function RoomsTable({checkIn, checkOut}: RoomsTableProps) {
  const [roomTypes, setRoomTypes ]   = useState<RoomType>();
  
  useEffect(()=> {
    const getAvailability = async ()=> {
      const result = await fetch('');
      const data = await result.json();
      setRoomTypes(data);
    }
    getAvailability();
  } , [checkIn, checkOut])
  return (
    <div>
      <h2>
        RoomsTable
        </h2>
      <table>
        
      </table>
        </div>
  )
}
